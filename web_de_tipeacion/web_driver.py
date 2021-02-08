from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

def fill_database(Words):

    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(executable_path='chromedriver.exe', options=options)

    driver.get('https://1000mostcommonwords.com/#ALL-LANGUAGES')

    list_of_lenguages = []
    lenguage_number = 0
    i=1

    while i < 108:

        a_word = driver.find_element_by_xpath(f'//*[@id="post-978"]/div/div[3]/div/p[1]/a[{i}]').text

        list_of_lenguages.append(a_word)

        i += 1

    for lenguage in list_of_lenguages:

        driver.get(f'https://1000mostcommonwords.com/1000-most-common-{lenguage}-words/')

        i = 2
        word_number=0

        #1002
        while i < 1002:
            word_lenght = 0

            if lenguage == "English":
                word = driver.find_element_by_xpath(f'/html/body/div[1]/div/div/div/main/article/div/div/table/tbody/tr[{i}]/td[3]').text
            else:

                try:
                    word = driver.find_element_by_xpath(f'/html/body/div[1]/div/div/div/main/article/div/div/table/tbody/tr[{i}]/td[2]').text
                except NoSuchElementException:
                    print(f'--------ERROR--{word_number}----------')
                    i += 1
                    word_number += 1
                    continue
                                                

            for a in word:
                word_lenght += 1

            words = Words(word=word, word_length=word_lenght, lenguage=lenguage)
            db.session.add(words)
            db.session.commit()


            print(f'{word} | {word_lenght} | {lenguage} | {word_number}')
            i += 1
            word_number += 1
        
        print(f'___________________|{lenguage_number}|____________________')
        lenguage_number += 1

    driver.close()



