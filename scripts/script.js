(function () {
  window.addEventListener('DOMContentLoaded', function () {

    const LIST = document.getElementById('students__list');
    const SORT_COLS = document.querySelectorAll('.hat');
    const FORM_BUTTON = document.getElementById('form__button');
    const SURNAME_STUDENT = document.getElementById('form-surname');
    const NAME_STUDENT = document.getElementById('form-name');
    const MIDDLE_NAME_STUDENT = document.getElementById('form-middle_name');
    const DATE_OF_BIRTH = document.getElementById('form-date-of-birth');
    const START_DATE = document.getElementById('form-start-date');
    const FACULTY = document.getElementById('form-faculty');
    let sortDirectionNa = true;
    let sortDirectionFa = true;
    let sortDirectionDa = true;
    let sortDirectionYe = true;

    let MAS_OF_STUDENTS = [
      {
        name: 'Алла',
        surname: 'Пугачёва',
        middleName: 'Борисовна',
        fullName: 'Пугачёва Алла Борисовна',
        dateOfBirth: new Date(),
        age: calculatingAge(new Date()),
        startDate: 2018,
        courseNumber: calculatingAge(new Date(2018, 8)) + 1,
        faculty: 'Певец',
      },
      {
        name: 'Евгений',
        surname: 'Петросян',
        middleName: 'Ваганович',
        fullName: 'Петросян Евгений Ваганович',
        dateOfBirth: new Date(),
        age: calculatingAge(new Date()),
        startDate: 2010,
        courseNumber: calculatingAge(new Date(2010, 8)) + 1,
        faculty: 'Юморист',
      },
      {
        name: 'Лариса',
        surname: 'Гробокопатель',
        middleName: 'Сергеевна',
        fullName: 'Гробокопатель Лариса Сергеевна',
        dateOfBirth: new Date(),
        age: calculatingAge(new Date()),
        startDate: 2014,
        courseNumber: calculatingAge(new Date(2010, 8)) + 1,
        faculty: 'Ювелирное дело',
      },
      {
        name: 'Елена',
        surname: 'Сидорова',
        middleName: 'Александровна',
        fullName: 'Сидорова Елена Александровна',
        dateOfBirth: new Date(),
        age: calculatingAge(new Date()),
        startDate: 2010,
        courseNumber: calculatingAge(new Date(2010, 8)) + 1,
        faculty: 'Повар',
      },
      {
        name: 'Александр',
        surname: 'Теплов',
        middleName: 'Алексеевич',
        fullName: 'Александр Саша Алексеевич',
        dateOfBirth: new Date(),
        age: calculatingAge(new Date()),
        startDate: 2002,
        courseNumber: calculatingAge(new Date(2010, 8)) + 1,
        faculty: 'Лингвист',
      }
    ];

    // ****************************************************************************************************************************************

    //Фильтрация
    document.querySelectorAll('.filter__input').forEach(el => el.addEventListener('keyup', filter));

    const STR_NAME = document.getElementById('legend-name');
    const STR_FACULTY = document.getElementById('faculty');
    const NUM_START = document.getElementById('start-training');
    const NUM_FINISH = document.getElementById('finish-training');

    function filter() {
      drawTheTable(MAS_OF_STUDENTS.filter(el =>
        el.fullName.toLowerCase().includes(STR_NAME.value.toLowerCase()) &&
        el.faculty.toLowerCase().includes(STR_FACULTY.value.toLowerCase()) &&
        (NUM_START.value === '' ? true : el.startDate === +NUM_START.value) &&
        (NUM_FINISH.value === '' ? true : (el.startDate + 4) === +NUM_FINISH.value)));
    }

    // ****************************************************************************************************************************************

    //Форма
    FORM_BUTTON.addEventListener('click', e => {
      e.preventDefault();

      if (
        !validationName(SURNAME_STUDENT.value, PART_OF_FORM_SURNAME) ||
        !validationName(NAME_STUDENT.value, PART_OF_FORM_NAME) ||
        !validationName(MIDDLE_NAME_STUDENT.value, PART_OF_FORM_MIDDLE_NAME) ||
        !validationDateOfBirth(DATE_OF_BIRTH.valueAsDate, PART_OF_FORM_DATE_OF_BIRTH) ||
        !validationStartDate(+START_DATE.value, PART_OF_FORM_START_DATE) ||
        !validationName(FACULTY.value, PART_OF_FORM_FACULTY)
      ) return;

      addStudent();
      cleanForm();
      ERROR.remove();
      filter();
    });

    //Принятие данных из формы
    function addStudent() {

      NAME_STUDENT.value = NAME_STUDENT.value[0].toUpperCase() + NAME_STUDENT.value.slice(1);
      SURNAME_STUDENT.value = SURNAME_STUDENT.value[0].toUpperCase() + SURNAME_STUDENT.value.slice(1);
      MIDDLE_NAME_STUDENT.value = MIDDLE_NAME_STUDENT.value[0].toUpperCase() + MIDDLE_NAME_STUDENT.value.slice(1);
      FACULTY.value = FACULTY.value[0].toUpperCase() + FACULTY.value.slice(1);

      const NEW_STUDENT = {
        name: NAME_STUDENT.value,
        surname: SURNAME_STUDENT.value,
        middleName: MIDDLE_NAME_STUDENT.value,
        fullName: `${SURNAME_STUDENT.value} ${NAME_STUDENT.value} ${MIDDLE_NAME_STUDENT.value}`,
        dateOfBirth: DATE_OF_BIRTH.valueAsDate,
        age: calculatingAge(DATE_OF_BIRTH.valueAsDate),
        startDate: +START_DATE.value,
        courseNumber: calculatingAge(new Date(+START_DATE.value, 8)) + 1,
        faculty: FACULTY.value,
      };

      MAS_OF_STUDENTS.push(NEW_STUDENT);

    }

    //Очищаем форму
    function cleanForm() {
      document.querySelectorAll('.form__input').forEach(el => el.value = '');
    }

    // ****************************************************************************************************************************************

    //Из js массива в DOM
    //Создаем элемент списка
    function createItem(obj) {

      const STUDENT = document.createElement('li');
      const STUDENT_FULL_NAME = document.createElement('div');
      const STUDENT_FACULTY = document.createElement('div');
      const STUDENT_DATE_OF_BIRTH = document.createElement('div');
      const STUDENT_YEARS_OF_EDUCATION = document.createElement('div');

      STUDENT.className = 'row students__item student';
      STUDENT_FULL_NAME.className = 'col-3 student_name';
      STUDENT_FACULTY.className = 'col-3 student_faculty';
      STUDENT_DATE_OF_BIRTH.className = 'col-3 student_date-of-birth';
      STUDENT_YEARS_OF_EDUCATION.className = 'col-3 student_years-of-education';

      STUDENT_FULL_NAME.textContent = obj.fullName;
      STUDENT_FACULTY.textContent = obj.faculty;
      STUDENT_DATE_OF_BIRTH.textContent = `${obj.dateOfBirth.toLocaleString("ru", { day: 'numeric', month: 'numeric', year: 'numeric' })} (${obj.age} лет)`;
      STUDENT_YEARS_OF_EDUCATION.textContent = obj.startDate + `-${obj.startDate + 4} (${obj.courseNumber > 4 ? 'закончил' : obj.courseNumber + ' курс'})`;

      STUDENT.append(STUDENT_FULL_NAME, STUDENT_FACULTY, STUDENT_DATE_OF_BIRTH, STUDENT_YEARS_OF_EDUCATION);

      return STUDENT;

    }

    //Рисуем таблицу
    function drawTheTable(mas) {

      document.querySelectorAll('.student').forEach(el => el.remove());

      for (let i = 0; i < mas.length; i++) {
        LIST.appendChild(createItem(mas[i]));
      }

    }

    drawTheTable(MAS_OF_STUDENTS);

    // ****************************************************************************************************************************************
    //Сортировка
    const SORT_FULL_NAME = document.getElementsByClassName('name')[0];
    const SORT_FACULTY = document.getElementsByClassName('faculty')[0];
    const SORT_DATE_OF_BIRTH = document.getElementsByClassName('date-of-birth')[0];
    const SORT_YEARS_OF_EDUCATION = document.getElementsByClassName('years-of-education')[0];

    //Сортировка по ФИО
    SORT_FULL_NAME.addEventListener('click', function () {

      MAS_OF_STUDENTS.sort((a, b) => {
        if (sortDirectionNa) {
          if (a.fullName > b.fullName) return 1;
          return -1;
        }
        if (a.fullName > b.fullName) return -1;
        return 1;
      });

      sortDirectionNa = !sortDirectionNa;

      SORT_COLS.forEach(el => el.classList.remove('direction-bottom', 'direction-top'));

      if (sortDirectionNa) {
        // SORT_FULL_NAME.classList.remove('direction-bottom');
        SORT_FULL_NAME.classList.add('direction-top');
      }
      else {
        SORT_FULL_NAME.classList.add('direction-bottom');
        // SORT_FULL_NAME.classList.remove('direction-top');
      }

      filter();
    });

    //Сортировка по факультету
    SORT_FACULTY.addEventListener('click', function () {

      MAS_OF_STUDENTS.sort((a, b) => {
        if (sortDirectionFa) {
          if (a.faculty > b.faculty) return 1;
          return -1;
        }
        if (a.faculty > b.faculty) return -1;
        return 1;
      });

      sortDirectionFa = !sortDirectionFa;

      SORT_COLS.forEach(el => el.classList.remove('direction-bottom', 'direction-top'));

      if (sortDirectionFa) {
        // SORT_FACULTY.classList.remove('direction-bottom');
        SORT_FACULTY.classList.add('direction-top');
      }
      else {
        SORT_FACULTY.classList.add('direction-bottom');
        // SORT_FACULTY.classList.remove('direction-top');
      }

      filter();
    });

    //Сортировка по дате рождения
    SORT_DATE_OF_BIRTH.addEventListener('click', function () {

      MAS_OF_STUDENTS.sort((a, b) => {
        if (sortDirectionDa) return a.dateOfBirth - b.dateOfBirth;
        return b.dateOfBirth - a.dateOfBirth;
      });

      sortDirectionDa = !sortDirectionDa;

      SORT_COLS.forEach(el => el.classList.remove('direction-bottom', 'direction-top'));

      if (sortDirectionDa) {
        // SORT_DATE_OF_BIRTH.classList.remove('direction-bottom');
        SORT_DATE_OF_BIRTH.classList.add('direction-top');
      }
      else {
        SORT_DATE_OF_BIRTH.classList.add('direction-bottom');
        // SORT_DATE_OF_BIRTH.classList.remove('direction-top');
      }

      filter();
    });

    //Сортировка по году начала обучения
    SORT_YEARS_OF_EDUCATION.addEventListener('click', function () {

      MAS_OF_STUDENTS.sort((a, b) => {
        if (sortDirectionYe) return a.startDate - b.startDate;
        return b.startDate - a.startDate;
      });

      sortDirectionYe = !sortDirectionYe;

      SORT_COLS.forEach(el => el.classList.remove('direction-bottom', 'direction-top'));

      if (sortDirectionYe) {
        // SORT_YEARS_OF_EDUCATION.classList.remove('direction-bottom');
        SORT_YEARS_OF_EDUCATION.classList.add('direction-top');
      }
      else {
        SORT_YEARS_OF_EDUCATION.classList.add('direction-bottom');
        // SORT_YEARS_OF_EDUCATION.classList.remove('direction-top');
      }

      filter();
    });

    // ****************************************************************************************************************************************

    //Валидация формы

    const ERROR = document.createElement('div');
    ERROR.classList.add('error');

    const PART_OF_FORM_SURNAME = document.querySelector('.part-of-form_surname');
    const PART_OF_FORM_NAME = document.querySelector('.part-of-form_name');
    const PART_OF_FORM_MIDDLE_NAME = document.querySelector('.part-of-form_middle-name');
    const PART_OF_FORM_DATE_OF_BIRTH = document.querySelector('.part-of-form_date-of-birth');
    const PART_OF_FORM_START_DATE = document.querySelector('.part-of-form_start-date');
    const PART_OF_FORM_FACULTY = document.querySelector('.part-of-form_faculty');

    //Валидация ФИО и факультета
    function validationName(str, elem) {

      str = str.trim();

      if (str === '') {
        addTooltip(elem, 'Это поле обязательное');
        return false;
      }

      str = str.toLowerCase().split('');

      if (str.some(el => ((el.charCodeAt() < 1072 || el.charCodeAt() > 1103) && el !== ' '))) {
        addTooltip(elem, 'Введите верные данные');
        return false;
      }

      return true;
    }

    //Валидация даты рождения
    function validationDateOfBirth(birth, elem) {

      const TODAY = new Date(); //Текущя дата
      const STARTING_POINT = 1900;

      if (birth === null) {
        addTooltip(elem, 'Укажите дату рождения');
        return false;
      }

      if (STARTING_POINT > birth.getFullYear() || birth > TODAY) {
        addTooltip(elem, 'Укажите верную дату рождения');
        return false;
      }

      return true;

    }

    //Валидация даты начала обучения
    function validationStartDate(num, elem) {

      const TODAY = new Date(); //Текущя дата
      const STARTING_POINT = 2000;

      if (STARTING_POINT > num || num > TODAY.getFullYear()) {
        addTooltip(elem, 'Укажите год начала обучения в диапазоне от 2000-го до текущего года');
        return false;
      }

      return true;

    }

    // ****************************************************************************************************************************************

    //Вычисляем возраст
    function calculatingAge(birth) {

      const TODAY = new Date(); //Текущя дата

      //Возраст = текущий год - год рождения
      const AGE = TODAY.getFullYear() - birth.getFullYear();

      const DOBTY = new Date(birth);
      DOBTY.setFullYear(TODAY.getFullYear());//ДР в текущем году

      //Если ДР в этом году ещё предстоит, то вычитаем из age один год
      if (TODAY < DOBTY) {
        return AGE - 1;
      }

      return AGE;
    }

    //Добавляем тултип
    function addTooltip(elem, text) {
      ERROR.textContent = text;
      elem.appendChild(ERROR);
    }

  });
})();