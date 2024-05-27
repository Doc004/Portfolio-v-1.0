;(function () {
	'use strict'

	// Функция для получения элементов
	const el = function (element) {
			if (element.charAt(0) === '#') {
					// Если передан ID...
					return document.querySelector(element) // ... возвращает один элемент
			}

			return document.querySelectorAll(element) // В противном случае, возвращает NodeList
	}

	// Переменные
	const viewer = el('#viewer'), // Экран калькулятора, где отображается результат
			equals = el('#equals'), // Кнопка равенства
			nums = el('.num'), // Список чисел
			ops = el('.ops'), // Список операторов
			clear = el('#clear'), // Кнопка очистки
			negative = el('#negative'), // Кнопка изменения знака
			percent = el('#percent'), // Кнопка процента
			historyEl = el('#history'), // Элемент истории
			maxDigits = 10; // Максимальное количество цифр

	let theNum = '', // Текущее число
			oldNum = '', // Первое число
			resultNum, // Результат
			operator, // Оператор
			history = []; // История вычислений

	// Функция для сохранения истории в localStorage
	const saveHistory = function () {
			localStorage.setItem('calcHistory', JSON.stringify(history));
	}

	// Функция для загрузки истории из localStorage
	const loadHistory = function () {
			const storedHistory = localStorage.getItem('calcHistory');
			if (storedHistory) {
					history = JSON.parse(storedHistory);
					updateHistory();
			}
	}

	// Когда: нажата цифра. Получить текущую выбранную цифру
	const setNum = function () {
			if (resultNum) {
					// Если результат был отображен, сбросить число
					theNum = this.getAttribute('data-num')
					resultNum = ''
			} else {
					// Проверка на превышение максимального количества цифр и наличие более одной точки
					if (theNum.length < maxDigits && !(this.getAttribute('data-num') === '.' && theNum.includes('.'))) {
							theNum += this.getAttribute('data-num')
					}
			}
			viewer.innerHTML = theNum // Отобразить текущее число
	}

	// Когда: нажат оператор. Передать число в oldNum и сохранить оператор
	const moveNum = function () {
			if (theNum === '' && this.getAttribute('data-ops') === 'minus') {
					theNum = '-';
			} else {
					oldNum = theNum
					theNum = ''
					operator = this.getAttribute('data-ops')
					equals.setAttribute('data-result', '') // Сбросить результат в атрибуте
			}
	}

	// Когда: нажато равно. Вычислить результат
	const displayNum = function () {
			// Преобразовать строковый ввод в числа
			oldNum = parseFloat(oldNum)
			theNum = parseFloat(theNum)

			// Выполнить операцию
			switch (operator) {
					case 'plus':
							resultNum = oldNum + theNum
							break
					case 'minus':
							resultNum = oldNum - theNum
							break
					case 'times':
							resultNum = oldNum * theNum
							break
					case 'divided by':
							resultNum = oldNum / theNum
							break
					default:
							resultNum = theNum
			}

			// Если возвращено NaN или Infinity
			if (!isFinite(resultNum)) {
					if (isNaN(resultNum)) {
							// Если результат не является числом
							resultNum = 'Ошибка!'
					} else {
							// Если результат бесконечность
							resultNum = "Недопустимая операция"
							el('#calculator').classList.add('broken') // "Сломать" калькулятор
							el('#reset').classList.add('show') // И показать кнопку сброса
					}
			}

			// Наконец, отобразить результат!
			viewer.innerHTML = resultNum
			equals.setAttribute('data-result', resultNum)

			// Добавить вычисление в историю
			history.push(`${oldNum} ${operator} ${theNum} = ${resultNum}`);
			updateHistory();
			saveHistory(); // Сохранить историю в localStorage

			// Сбросить oldNum и сохранить результат
			oldNum = 0
			theNum = resultNum
	}

	// Когда: нажата кнопка очистки. Очистить все
	const clearAll = function () {
			oldNum = ''
			theNum = ''
			viewer.innerHTML = '0'
			equals.setAttribute('data-result', resultNum)
	}

	// Когда: нажата кнопка изменения знака. Изменить знак текущего числа
	const toggleSign = function () {
			if (theNum) {
					theNum = (parseFloat(theNum) * -1).toString()
					viewer.innerHTML = theNum
			}
	}

	// Когда: нажата кнопка процента. Вычислить процент текущего числа
	const calculatePercent = function () {
			if (theNum) {
					theNum = (parseFloat(theNum) / 100).toString()
					viewer.innerHTML = theNum
			}
	}

	// Обновить историю вычислений
	
	const updateHistory = function () {
			historyEl.innerHTML = history.join('<br>')
	}

	// Обработчик ввода с клавиатуры
	const handleKeyPress = function (e) {
			const key = e.key;

			if (!isNaN(key) || key === '.') {
					const numEl = document.querySelector(`[data-num="${key}"]`);
					if (numEl) numEl.click();
			} else if (key === '+' || key === '-' || key === '*' || key === '/') {
					const opsMap = {
							'+': 'plus',
							'-': 'minus',
							'*': 'times',
							'/': 'divided by'
					};
					const opsEl = document.querySelector(`[data-ops="${opsMap[key]}"]`);
					if (opsEl) opsEl.click();
			} else if (key === 'Enter') {
					equals.click();
			} else if (key === 'Escape') {
					clear.click();
			}
	}

	/* Обработчики кликов */

	// Добавить обработчик кликов для чисел
	for (let i = 0, l = nums.length; i < l; i++) {
			nums[i].onclick = setNum
	}

	// Добавить обработчик кликов для операторов
	for (let i = 0, l = ops.length; i < l; i++) {
			ops[i].onclick = moveNum
	}

	// Добавить обработчик кликов для знака равенства
	equals.onclick = displayNum

	// Добавить обработчик кликов для кнопки очистки
	clear.onclick = clearAll

	// Добавить обработчик кликов для кнопки изменения знака
	negative.onclick = toggleSign

	// Добавить обработчик кликов для кнопки процента
	percent.onclick = calculatePercent

	// Добавить обработчик ввода с клавиатуры
	document.addEventListener('keydown', handleKeyPress)

	// Загрузить историю при загрузке страницы
	loadHistory();
	// ...


})()
