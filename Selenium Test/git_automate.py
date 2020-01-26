from selenium import webdriver
import getpass
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

class SeleniumTest:
    driver = None
    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--ignore-certificate-errors')
        options.add_argument("--test-type")
        options.binary_location = "\\usr\\bin\\chromium"
        self.driver = webdriver.Chrome("D:\\Subjects\\SE\\CSC510-6\\chromedriver.exe")
        self.driver.get('https://github.ncsu.edu/login')

        # login with credentials
        inputElement = self.driver.find_element_by_id("login_field")
        inputElement.send_keys('lmsharda')

        inputElement = self.driver.find_element_by_id("password")
        inputElement.send_keys('ShardaL@1996')

        self.driver.find_elements_by_xpath("//*[@id='login']/form/div[4]/input[4]")[0].click()
        for a in self.driver.find_elements_by_xpath("//*[@id='dashboard']/div/div[1]/div/div/ul"):
            options = a.find_elements_by_tag_name("li")
            for option in options:
                repo = option.find_elements_by_tag_name("div")[0].find_elements_by_tag_name("a")[0].get_attribute(
                    'href')
                if "GloryBot" in repo:
                    repo_url = repo

        self.driver.get(repo_url)

    def commit(self):
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[1]/a').click()
        time.sleep(1)
        self.driver.find_elements_by_css_selector('#branch-select-menu')[0].click()
        time.sleep(2)
        self.driver.find_elements_by_css_selector(
            '#branch-select-menu > details-menu > tab-container > div:nth-child(2) > div > a:nth-child(2)')[0].click()
        time.sleep(2)
        self.driver.find_elements_by_xpath("//*[@id='js-repo-pjax-container']/div[2]/div[1]/div[3]/div[2]/form/button")[
            0].click()
        time.sleep(2)
        inputElement = self.driver.find_elements_by_xpath("//*[@id='js-repo-pjax-container']/div[2]/div[1]/div/form[2]/div[1]/span/input")[0]
        inputElement.send_keys('Test10.js')
        self.driver.find_elements_by_xpath("//*[@id='submit-file']")[0].click()
        time.sleep(2)
        self.driver.find_elements_by_css_selector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.file-navigation.in-mid-page.d-flex.flex-items-start > a')[0].click()
        time.sleep(2)
        self.driver.find_elements_by_css_selector('#pull_request_title')[0].send_keys('Dev Test8.js')
        time.sleep(2)
        self.driver.find_elements_by_css_selector(
            '#new_pull_request > div.discussion-timeline > div > div > div.d-flex.flex-justify-end.m-2 > div > button')[
            0].click()
        time.sleep(2)

    def merge(self):
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[3]/a').click()
        time.sleep(2)
        while (True):
            pull = self.driver.find_elements(By.PARTIAL_LINK_TEXT, 'Dev')
            if len(pull):
                print(pull[0].get_attribute('href'))
                pull[0].click()
                time.sleep(1)
                self.driver.find_elements_by_css_selector(
                    '#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-merging > div > div > div > div.merge-message > div.select-menu.d-inline-block.js-menu-container.js-select-menu > div.BtnGroup.btn-group-merge > button.btn.btn-primary.BtnGroup-item.js-details-target')[
                    0].click()
                time.sleep(2)
                self.driver.find_elements_by_css_selector(
                    '#partial-pull-merging > div.merge-pr.js-merge-pr.js-details-container.Details.is-merging.js-transitionable.open.Details--on > form > div > div.commit-form-actions > div > div.BtnGroup.btn-group-merge > button')[
                    0].click()
                time.sleep(1)
                self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[3]/a').click()
                time.sleep(2)
            else:
                break

    def createIssue(self):
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[2]/a').click()
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[2]/div[1]/div/div[1]/a').click()
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="issue_title"]').send_keys('Selenium Issue')
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="new_issue"]/div/div[1]/div/div/div[3]/button').click()
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[2]/a').click()
        time.sleep(1)

    def closeIssue(self):
        self.driver.find_element_by_xpath('//*[@id="js-repo-pjax-container"]/div[1]/nav/span[2]/a').click()
        time.sleep(1)
        self.driver.find_elements_by_partial_link_text('Selenium')[0].click()
        time.sleep(1)
        self.driver.find_element_by_xpath('//*[@id="partial-new-comment-form-actions"]/button[2]').click()

if __name__ == '__main__':
    s = SeleniumTest()
    s.createIssue()
    s.closeIssue()
    s.commit()
    s.merge()


