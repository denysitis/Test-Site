// Динамічне встановлення значення ON OFF
$('#toggle-button-status').on('change', function() {
  if ($(this).is(':checked')) {
    $(this).val('ON');
  } else {
    $(this).val('OFF');
  }
});

// Очищення полів після закриття форми
$('#user-form-modal').on('hidden.bs.modal', function(e) {
  $('#updateform input[name="id"]').val('');
  $('#updateform input[name="first-name"]').val('');
  $('#updateform input[name="last-name"]').val('');
  $('.toggle-button').prop('checked', false);
  $('.toggle-button').val('OFF');
  $('#role').val('Admin');
});


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

// Заміна add user на edit user
$(document).ready(function() {
  $('[id^="edit-button-"]').click(function() {
    $('#UserModalLabel').text('Edit user');
  });
  $('#add_butt').click(function() {
    $('#UserModalLabel').text('Add user');
  });
});

//Встановлення checked
const allItemsCheckbox = $('#all-items');
const customCheckboxes = $('.custom-control-input');
const checkboxes = $('.checkbox-user');

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
      const allChecked = checkboxes.toArray().every(cb => cb.checked);
      allItemsCheckbox.prop('checked', allChecked);
    }
  });
});



//AJAX запит на зміну Set active, Set active, Delete (працює)
$('#buttOK').click(function(event) {
  event.preventDefault();
  const checkboxes = $('input[type="checkbox"]:checked');
  const selectElement = $('#filter');

  if (!selectElement.val() && !checkboxes.length) {
    $('#none-reaction-and-user').modal('show');
    $('#none-reaction-and-user').css('display', 'block').removeAttr('aria-hidden');
  }
  else if (!selectElement.val()) {
    $('#select-an-action-modal').modal('show');
    $('#select-an-action-modal').css('display', 'block').removeAttr('aria-hidden');
  }
  else if (selectElement.val() === 'Delete') {
    if (!checkboxes.length) {
      $('#select-an-user-modal').modal('show');
      $('#select-an-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
    else {
      $('#delete-user-modal').modal('show');
      $('#delete-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
  }
  else {
    if (!checkboxes.length) {
      $('#select-an-user-modal').modal('show');
      $('#select-an-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
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
        default:
          value = '';
      }

      if (value) {
        $.ajax({
          type: 'POST',
          url: './checked-toggle.php',
          data: {id: id, value: value},
          success: function(response) {
            //console.log(response);
            const data = JSON.parse(response);
            const toggle = data.toggle;
            
            $('tr').each(function() {
              const id = $(this).attr('id');
              if (id === 'user-' + data.id) {
                const circle = $(this).find('i.fa-circle');
                if (toggle === 'ON') {
                  //console.log("toggle= ON");
                  circle.find('span').text('ON');
                  circle.addClass('active-circle').removeClass('not-active-circle');
                } else if (toggle === 'OFF') {
                  //console.log("toggle= OFF");
                  circle.find('span').text('OFF');
                  circle.addClass('not-active-circle').removeClass('active-circle');
                }
              }
            });
            // Скинути всі значення checked
            $('input[type="checkbox"]:checked').each(function() {
              $(this).prop('checked', false);
            });
            // Очистити вибране значення і встановити значення "-Please Select-"
            $("#filter").prop("selectedIndex", -1).children().first().prop("selected", true); 
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
          }
        });
      }
    });
  }
});

//(працює)
$('#buttOKunder').click(function(event) {
  event.preventDefault();
  const checkboxes = $('input[type="checkbox"]:checked');
  const selectElement = $('#filter_under');

  if (!selectElement.val() && !checkboxes.length) {
    $('#none-reaction-and-user').modal('show');
    $('#none-reaction-and-user').css('display', 'block').removeAttr('aria-hidden');
  }
  else if (!selectElement.val()) {
    $('#select-an-action-modal').modal('show');
    $('#select-an-action-modal').css('display', 'block').removeAttr('aria-hidden');
  }
  else if (selectElement.val() === 'Delete-under') {
    if (!checkboxes.length) {
      $('#select-an-user-modal').modal('show');
      $('#select-an-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
    else {
      $('#delete-user-modal').modal('show');
      $('#delete-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
  }
  else {
    if (!checkboxes.length) {
      $('#select-an-user-modal').modal('show');
      $('#select-an-user-modal').css('display', 'block').removeAttr('aria-hidden');
    }
    checkboxes.each(function() {
      const id = this.id.split('-')[1];
      let value = '';
      switch(selectElement.val()) {
        case 'Set-active-under':
          value = 'ON';
          break;
        case 'Set-not-active-under':
          value = 'OFF';
          break;
        default:
          value = '';
      }

      if (value) {
        $.ajax({
          type: 'POST',
          url: './checked-toggle.php',
          data: {id: id, value: value},
          success: function(response) {
            //console.log(response);
            const data = JSON.parse(response);
            const toggle = data.toggle;
            
            $('tr').each(function() {
              const id = $(this).attr('id');
              if (id === 'user-' + data.id) {
                const circle = $(this).find('i.fa-circle');
                if (toggle === 'ON') {
                  //console.log("toggle= ON");
                  circle.find('span').text('ON');
                  circle.addClass('active-circle').removeClass('not-active-circle');
                } else if (toggle === 'OFF') {
                  //console.log("toggle= OFF");
                  circle.find('span').text('OFF');
                  circle.addClass('not-active-circle').removeClass('active-circle');
                }
              }
            });
            $('input[type="checkbox"]:checked').each(function() {
              $(this).prop('checked', false);
            });
            // Очистити вибране значення і встановити значення "-Please Select-"
            $("#filter_under").prop("selectedIndex", -1).children().first().prop("selected", true);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
          }
        });
      }
    });
  }
});

//видалення даних через конфірм поп-ап вікно
$('#confirm-delete-user').click(function(event) {
  const checkboxes = $('input[type="checkbox"]:checked');

  checkboxes.each(function() {
    const id = this.id.split('-')[1];
    $.ajax({
      type: 'POST',
      url: './checked-toggle.php',
      data: {id: id, value: 'DELETE'},
      success: function(response) {
        //console.log(response);
        const data = JSON.parse(response);
        const id = data.id;
        console.log("delete id = "+ id);

        const DeleteUserWithConfirm = document.getElementById('user-' + id);
        DeleteUserWithConfirm.remove();
        // Очистити вибране значення і встановити значення "-Please Select-"
        $("#filter_under").prop("selectedIndex", -1).children().first().prop("selected", true); 
        $("#filter").prop("selectedIndex", -1).children().first().prop("selected", true);   
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
  });
  $('#delete-user-modal').modal('hide');  
}); 


//Валідація полів форми
const firstNameInput = $('#first-name');
const lastNameInput = $('#last-name');

function validateForm() {
  let isValid = true;

  if (firstNameInput.val() === '') {

    firstNameInput.parent().find('.errorfront').text("Поле 'Ім'я' не може бути порожнім");
    isValid = false;

  } else if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ]+$/.test(firstNameInput.val())) {

    firstNameInput.parent().find('.errorfront').text("Поле 'Ім'я' не може містити цифри або спецсимволи");
    isValid = false;

  }
  else {
    firstNameInput.parent().find('.errorfront').text("");
    isValid = true;
  }

  if (lastNameInput.val() === '') {

    lastNameInput.parent().find('.errorfront').text("Поле 'Прізвище' не може бути порожнім");
    isValid = false;

  } else if (!/^[a-zA-Zа-яА-ЯіїєґІЇЄҐ]+$/.test(lastNameInput.val())) {

    lastNameInput.parent().find('.errorfront').text("Поле 'Прізвище' не може містити цифри або спецсимволи");
    isValid = false;

  }
  else {
    lastNameInput.parent().find('.errorfront').text("");
    isValid = true;
  }

  return isValid;
}

//Очищення полів при закриванні форми
const closeButtClear = $('#add_butt');
const closeButtDagger = $('.edit_clear');

function clearErrors() {
  firstNameInput.parent().find('.errorfront').text("");
  lastNameInput.parent().find('.errorfront').text("");
}

closeButtClear.on('click', clearErrors);
closeButtDagger.on('click', clearErrors);

//AJAX запит на оновлення і додавання даних у таблиці (працює)
const form = $('#updateform');

form.on('submit', function(event) {
  if (!validateForm()) {
    event.preventDefault();
    return;
  }
    event.preventDefault();
    const formData = form.serialize();

    $.ajax({
      url: './update.php',
      type: 'POST',
      data: formData,
      dataType: 'json',
      success: function(response) {
        console.log(response);
        const data_update = response.user;
        console.log(data_update);
        const name_first = data_update.name_first;
        const name_last = data_update.name_last;
        const role = data_update.role;
        const status = data_update.status;
        const id = data_update.id;
        const userRow = $('#user-' + id);
        //console.log("userRow id =" + id);

        if (!userRow.length) {
        // якщо користувача немає, додаємо його до таблиці
          if (status === 'ON') {
            statusField_fa_circle = 'active-circle';
          } else if (status === 'OFF') {
            statusField_fa_circle = 'not-active-circle';
          }
          const tbody = $('tbody');
          const newRow = $('<tr></tr>').attr('id', 'user-' + id).html('<td class="align-middle"> <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top"> <input type="checkbox" class="custom-control-input checkbox-user" id="item-' + id + '"> <label class="custom-control-label" for="item-' + id + '"></label> </div> </td> <td class="text-nowrap align-middle name-field">' + name_first + ' ' + name_last + '</td> <td class="text-nowrap align-middle role-field"><span>' + role + '</span></td> <td class="text-center align-middle"><i class="fa fa-circle '+ statusField_fa_circle +' "><span data-id="' + id + '" style="display: none;" class="status-field">' + status + '</span></i></td> <td class="text-center align-middle"> <div class="btn-group align-top"> <button id="edit-button-' + id + '" class="btn btn-sm btn-outline-secondary badge edit_clear" type="button" data-toggle="modal" data-id="' + id + '">Edit</button> <button id="delete-button-' + id + '" class="btn btn-sm btn-outline-secondary badge" type="button" data-id="' + id + '"><i class="fa fa-trash"></i></button></div> </td>');
          tbody.append(newRow);
          $('#user-form-modal').modal('hide');
          $(document).ready(function() {
            var clickCounts = {};
            
            $('[id^="edit-button-"]').click(function() {
              var id = $(this).data('id');
              $('#user-form-modal').modal('show');
              $('#user-form-modal').find('#updateform input[name="id"]').val(id);
              //console.log(id);
              $.ajax({
                  url: './proces.php',
                  type: 'POST',
                  data: { new_id: id },
                  success: function(response) {
                    const data_proces = JSON.parse(response);

                    const name_first = data_proces.name_first;
                    const name_last = data_proces.name_last;
                    const role = data_proces.role;
                    const toggle = data_proces.toggle;

                    $('#user-form-modal').find('#updateform input[name="first-name"]').val(name_first);
                    $('#user-form-modal').find('#updateform input[name="last-name"]').val(name_last);

                    if (toggle === 'ON') {
                      $('.toggle-button').prop('checked', true);
                      $('.toggle-button').val('ON');
                    } else if (toggle === 'OFF') {
                      $('.toggle-button').prop('checked', false);
                      $('.toggle-button').val('OFF');
                    }

                    if (role === 'Admin') {
                      $('#role').val('Admin');
                    } else if (role === 'User') {
                      $('#role').val('User');
                    }

                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.error(textStatus, errorThrown);
                  }
              });
            });
          });
          $('[id^="delete-button-"]').click(function() {
            var id = $(this).data('id');
            $('#delete-user-modal-single').modal('show');
            $('#delete-user-modal-single').css('display', 'block').removeAttr('aria-hidden');

            $('#confirm-delete-user-single').click(function(event) {
              event.preventDefault();
              $.ajax({
                url: './delete.php',
                type: 'POST',
                data: { id: id },
                dataType: 'json',
                success: function(response) {
                  //console.log(response);
                  const id = response.id;
                  const DeleteUserWithConfirm = document.getElementById('user-' + id);
                  DeleteUserWithConfirm.remove();
                  // Очистити вибране значення і встановити значення "-Please Select-"
                  $("#filter_under").prop("selectedIndex", -1).children().first().prop("selected", true);
                  $("#filter").prop("selectedIndex", -1).children().first().prop("selected", true);   
                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.error(textStatus, errorThrown);
                }
              });
              $('#delete-user-modal-single').modal('hide');
            });
          });
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
        } else {
        // якщо користувач вже існує, оновлюємо інформацію про нього
          const nameField = userRow.find('.name-field');
          const roleField = userRow.find('.role-field');
          const statusField = userRow.find('.status-field');
          const statusField_fa_circle = userRow.find('.fa-circle');

          nameField.html(name_first + ' ' + name_last);
          roleField.html(role);
          statusField.html(status);
          

          if (status === 'ON') {
            statusField_fa_circle.addClass('active-circle').removeClass('not-active-circle');
          } else if (status === 'OFF') {
            statusField_fa_circle.addClass('not-active-circle').removeClass('active-circle');
          }
          $('#user-form-modal').modal('hide');
          $('#user-success-update-form').modal('show');
        }
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  //}
  
});

//AJAX запит на видалення даних у таблиці (працює)
$('[id^="delete-button-"]').click(function() {
  var id = $(this).data('id');
  $('#delete-user-modal-single').modal('show');
  $('#delete-user-modal-single').css('display', 'block').removeAttr('aria-hidden');

  $('#confirm-delete-user-single').click(function(event) {
    event.preventDefault();
    $.ajax({
      url: './delete.php',
      type: 'POST',
      data: { id: id },
      dataType: 'json',
      success: function(response) {
        //console.log(response);
        const id = response.id;
        const DeleteUserWithConfirm = document.getElementById('user-' + id);
        DeleteUserWithConfirm.remove();
        // Очистити вибране значення і встановити значення "-Please Select-"
        $("#filter_under").prop("selectedIndex", -1).children().first().prop("selected", true);  
        $("#filter").prop("selectedIndex", -1).children().first().prop("selected", true);  
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
    });
    $('#delete-user-modal-single').modal('hide');
  });
});


//Отримання даних з БД при відкритті модального вікна (працює)
$(document).ready(function() {
  var clickCounts = {};
  
  $('[id^="edit-button-"]').click(function() {
    var id = $(this).data('id');
    $('#user-form-modal').modal('show');
    $('#user-form-modal').find('#updateform input[name="id"]').val(id);
    //console.log(id);
    $.ajax({
        url: './proces.php',
        type: 'POST',
        data: { new_id: id },
        success: function(response) {
          const data_proces = JSON.parse(response);

          const name_first = data_proces.name_first;
          const name_last = data_proces.name_last;
          const role = data_proces.role;
          const toggle = data_proces.toggle;

          $('#user-form-modal').find('#updateform input[name="first-name"]').val(name_first);
          $('#user-form-modal').find('#updateform input[name="last-name"]').val(name_last);

          if (toggle === 'ON') {
            $('.toggle-button').prop('checked', true);
            $('.toggle-button').val('ON');
          } else if (toggle === 'OFF') {
            $('.toggle-button').prop('checked', false);
            $('.toggle-button').val('OFF');
          }

          if (role === 'Admin') {
            $('#role').val('Admin');
          } else if (role === 'User') {
            $('#role').val('User');
          }

        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        }
    });
  });
});