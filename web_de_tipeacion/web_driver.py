from selenium import webdriver

def fill_database(db, Words):

    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(executable_path='chromedriver.exe', options=options)

    driver.get('https://1000mostcommonwords.com/#ALL-LANGUAGES')

    list_of_lenguages = []
    i=1

    while i < 3:

        a_word = driver.find_element_by_xpath(f'//*[@id="post-978"]/div/div[3]/div/p[1]/a[{i}]').text

        list_of_lenguages.append(a_word)

        i += 1

    for lenguage in list_of_lenguages:

        driver.get(f'https://1000mostcommonwords.com/1000-most-common-{lenguage}-words/')

        i = 2

        while i < 13:
            word_lenght = 0
            word = driver.find_element_by_xpath(f'/html/body/div[1]/div/div/div/main/article/div/div/table/tbody/tr[{i}]/td[2]').text

            for a in word:
                word_lenght += 1

            print(f'{word} | {word_lenght} | {lenguage}')

            words = Words(word=word, word_lenght=word_lenght, lenguage=lenguage)
            db.session.add(words)
            db.session.commit()

            i += 1
        
        print('_________________________________________')

    driver.close()

