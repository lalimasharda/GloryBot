import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

class SeleniumTest(unittest.TestCase):
    def setUp(self):
        if not os.environ['SLACKUSER']:
            print('Please set environment variable SLACKUSER with appropriate slack_user_id')
            raise Exception('User ID is not set in os environment variable for slack testing')

        if not os.environ['SLACKPASS']:
            print('Please set environment variable SLACKPASS with appropriate slack_user_pass')
            raise Exception('Password is not set in os environment variable for slack testing')

        if not os.environ['SLACKWORKSPACE']:
            print('Please set environment variable SLACKWORKSPACE  with appropriate slack_user_pass')
            raise Exception('Slack workspace url is not set in os environment variable for slack testing')

        options = webdriver.ChromeOptions()
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-set-uid-sandbox")
        options.add_argument("--disable-dev-shm-using")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-gpu")
        options.add_argument("start-maximized")
        options.add_argument("disable-infobars")
        options.add_argument("--headless")
        # options.binary_location = "\\usr\\bin\\chromium"
        self.driver = webdriver.Chrome(options=options)
        self.driver.get(os.environ['SLACKWORKSPACE'])

        # login with credentials
        inputElement = self.driver.find_element_by_id("email")
        inputElement.send_keys(os.environ['SLACKUSER'])
        inputElement = self.driver.find_element_by_id("password")
        inputElement.send_keys(os.environ['SLACKPASS'])

        self.driver.find_element_by_id('signin_btn').click()

        wait = WebDriverWait(self.driver, 10)
        #wait.until(EC.title_contains('general'))


    #test bot user present or not
    def test_bot_user(self):
        self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[2]/div/div[2]/div[2]/button[1]').click()
        self.driver.refresh()
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located((By.XPATH,'/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/button')))
        self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/button').click()
        self.driver.refresh()
        wait.until(EC.presence_of_element_located((By.XPATH,'/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/div/div/ul')))
        li = self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/div/div/ul')
        apps = li.find_elements_by_css_selector('span.c-truncate')
        f = False
        for i in apps:
            if i.text == 'GloryBotAPP':
                f = True
        self.assertEqual(f, True)

    #test to see if bot is active or not
    def test_bot_active(self):
        self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[2]/div/div[2]/div[2]/button[1]').click()
        self.driver.refresh()
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located((By.XPATH, '/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/button')))
        self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/button').click()
        self.driver.refresh()
        wait = WebDriverWait(self.driver, 10)
        wait.until(EC.presence_of_element_located(
            (By.XPATH, '/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/div/div/ul')))
        apps = self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[5]/div/div/div[2]/div[1]/div/div[1]/div/div[5]/div/div/ul')
        li = apps.find_elements_by_tag_name('li')
        for i in li:
            if i.find_element_by_css_selector('span.c-truncate').text == 'GloryBotAPP':
                self.assertTrue('c-presence--active' in i.find_element_by_tag_name('i').get_attribute('class'))
                return
        self.assertTrue(False)

    #test to see if bot does not send null messages or no messages [alternative path for all use cases]
    def test_message_none(self):
        message = self.get_message()
        for i in message:
            if i == '':
                self.assertTrue(False)
        self.assertTrue(True)

    # test to see that bot is sending appropriate message for use case 1
    def test_message_badge(self):
        message = self.get_message()
        found = False
        for i in message:
            if ("receiving Badge" in i):
                found = True
                self.assertTrue(True)
        if not found:
            self.assertTrue(False)

    # test to see that bot is sending appropriate message for use case 2
    def test_message_leaderboard(self):
        message = self.get_message()
        found = False
        for i in message:
            if "Leaderboard" in i:
                found = True
                self.assertTrue(True)
        if not found:
            self.assertTrue(False)

    # test to see that bot is sending appropriate message for use case 3
    def test_message_congratulate(self):
        message = self.get_message()
        found = False
        for i in message:
            if ("Congratulations" in i):
                found = True
                self.assertTrue(True)
        if not found:
            self.assertTrue(False)

    #to get the messages sent by bot
    #this function returns messages posted by bot in order to verify the messages
    def get_message(self):
        board = self.driver.find_element_by_xpath('/html/body/div[2]/div/div/div[4]/div/div/div')
        res = board.find_elements_by_link_text('GloryBot')
        message = []
        for i in res:
            parent = i.find_element_by_xpath('../../..')
            span = parent.find_element(By.CLASS_NAME, 'c-message__body')
            message.append(span.text)
        return message

if __name__ == '__main__':
    unittest.main()



