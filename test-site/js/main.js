//Зміна кольору кружечка
$('i.fa-circle').each(function() {
  const spanTag = $(this).find('span');

  if (spanTag.text() === 'ON') {
    $(this).addClass('active-circle');
    $(this).removeClass('not-active-circle');
  } else if (spanTag.text() === 'OFF') {
    $(this).addClass('not-active-circle');
    $(this).removeClass('active-circle');
  }
});

//Встановлення флажків
const allItemsCheckbox = $('#all-items');
const customCheckboxes = $('.custom-control-input');

allItemsCheckbox.on('click', () => {
  customCheckboxes.each(function() {
    this.checked = allItemsCheckbox.prop('checked');
  });
});

customCheckboxes.each(function() {
  $(this).on('click', () => {
    if (!this.checked) {
      allItemsCheckbox.prop('checked', false);
    } else {
      const allChecked = customCheckboxes.toArray().every(cb => cb.checked);
      allItemsCheckbox.prop('checked', allChecked);
    }
  });
});

//AJAX запит на зміну Set active, Set active, Delete
$('#buttOK').click(function(event) {
  event.preventDefault();

  const checkboxes = $('input[type="checkbox"]:checked');
  const selectElement = $('#filter');

  checkboxes.each(function() {
    const id = this.id.split('-')[1];
    let value = '';
    switch(selectElement.val()) {
      case 'Set-active':
      value = 'ON';
      break;
      case 'Set-not-active':
      value = 'OFF';
      break;
      case 'Delete':
      value = 'DELETE';
      break;
      default:
      value = '';
    }
    $.ajax({
      type: 'POST',
      url: './checked-toggle.php',
      data: {id: id, value: value},
      success: function(response) {
        console.log(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
  });
});

//AJAX запит на оновлення даних у таблиці
const form = $('#updateform');

form.on('submit', function(event) {
  event.preventDefault();

  const formData = form.serialize();

  $.ajax({
    url: './update.php',
    type: 'POST',
    data: formData,
    dataType: 'json',
    success: function(data) {
    if (data.status === 200) {
      alert("Сталася помилка! Спробуйте ще раз.");
    } else {
      alert("Дані успішно збережені!");
    }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
});

//AJAX запит на видалення даних у таблиці
const formDel = $('#deleteform');

formDel.on('submit', function(event) {
  // event.preventDefault();

  const formData = formDel.serialize();

  $.ajax({
    url: './delete.php',
    type: 'POST',
    data: formData,
    dataType: 'json',
    success: function(data) {
    if (data.status === 200) {
      alert("Сталася помилка! Спробуйте ще раз.");
    } else {
      alert("Дані успішно збережені!");
    }
    },
    error: function(error) {
      console.error('Error:', error);
    }
  });
});