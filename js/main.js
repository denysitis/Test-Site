// Динамічне встановлення значення ON OFF
$('#toggle-button-status').on('change', function() {
  if ($(this).is(':checked')) {
    $(this).val('1');
  } else {
    $(this).val('0');
  }
});

// Очищення полів після закриття форми
$('#user-form-modal').on('hidden.bs.modal', function(e) {
  $('#updateform input[name="id"]').val('');
  $('#updateform input[name="first-name"]').val('');
  $('#updateform input[name="last-name"]').val('');
  $('.toggle-button').prop('checked', false);
  $('.toggle-button').val('0');
  $('#role').val('Admin');
});


//Зміна кольору кружечка
$('i.fa-circle').each(function() {
  const spanTag = $(this).find('span');

  if (spanTag.text() == '1') {
    $(this).addClass('active-circle');
    $(this).removeClass('not-active-circle');
  } else if (spanTag.text() == '0') {
    $(this).addClass('not-active-circle');
    $(this).removeClass('active-circle');
  }
});

// Заміна add user на edit user
$(document).ready(function() {
  $('[id^="edit-button-"]').click(function() {
    $('#UserModalLabel').text('Edit user');
  });
  $('button#add_butt').click(function() {
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


//AJAX запит на зміну Set active, Set active, Delete з відправленням тільки через один запит ajax checked-toggle.php
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
    } else {
      const id_array = [];
      const value_array = [];
      checkboxes.each(function() {
      const id = this.id.split('-')[1];
      let value = '';
      switch(selectElement.val()) {
        case 'Set-active':
        value = '1';
        break;
        case 'Set-not-active':
        value = '0';
        break;
        default:
        value = '';
      }
      if (value) {
        id_array.push(id);
        value_array.push(value);
        }
      });
        if (id_array.length > 0 && value_array.length > 0) {
          $.ajax({
            type: 'POST',
            url: './checked-toggle.php',
            data: {id: id_array, value: value_array},
            success: function(response) {
            const data = JSON.parse(response);

            data.forEach(function(item) {
            //console.log(item.error.message);
            if (item.error !== null && item.error.message === "ID does not exist in database") {
              $('#error-users-not-found').modal('show');
            }
            else {
              const id = item.user.id;
              const toggle = item.user.status;
                
                $('tr').each(function() {
                  const rowId = $(this).attr('id');
                  if (rowId === 'user-' + id) {
                    const circle = $(this).find('i.fa-circle');
                    if (toggle == '1') {
                      circle.find('span').text('1');
                      circle.addClass('active-circle').removeClass('not-active-circle');
                    } else if (toggle == '0') {
                      circle.find('span').text('0');
                      circle.addClass('not-active-circle').removeClass('active-circle');
                    }
                  }
                });
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
    }
  }
});

//AJAX запит Under на зміну Set active, Set active, Delete з відправленням тільки через один запит ajax checked-toggle.php
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
    } else {
      const id_array = [];
      const value_array = [];
      checkboxes.each(function() {
      const id = this.id.split('-')[1];
      let value = '';
      switch(selectElement.val()) {
        case 'Set-active-under':
          value = '1';
          break;
        case 'Set-not-active-under':
          value = '0';
          break;
        default:
          value = '';
      }
      if (value) {
        id_array.push(id);
        value_array.push(value);
        }
      });
        if (id_array.length > 0 && value_array.length > 0) {
          $.ajax({
            type: 'POST',
            url: './checked-toggle.php',
            data: {id: id_array, value: value_array},
            success: function(response) {
            const data = JSON.parse(response);


            data.forEach(function(item) {
            if (item.error !== null && item.error.message === "ID does not exist in database") {
              $('#error-users-not-found').modal('show');
            }
            else {
              const id = item.user.id;
              const toggle = item.user.status;
              
                $('tr').each(function() {
                  const rowId = $(this).attr('id');
                  if (rowId === 'user-' + id) {
                    const circle = $(this).find('i.fa-circle');
                    if (toggle == '1') {
                      circle.find('span').text('1');
                      circle.addClass('active-circle').removeClass('not-active-circle');
                    } else if (toggle == '0') {
                      circle.find('span').text('0');
                      circle.addClass('not-active-circle').removeClass('active-circle');
                    }
                  }
                });
              }
            });
            // Скинути всі значення checked
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
    }
  }
});


//видалення даних через конфірм поп-ап вікно за допомогою одного ajax запиту
$("#confirm-delete-user").click(function(event) {
  const checkboxes = $('input[type="checkbox"]:checked');
  const id_array = [];
  const value_array = [];

  checkboxes.each(function() {
    const id = this.id.split("-")[1];
    id_array.push(id);
    value_array.push("DELETE");
  });

  $.ajax({
    type: "POST",
    url: "./checked-toggle.php",
    data: { id: id_array, value: value_array },
    success: function(response) {
    const data = JSON.parse(response);
    data.forEach(function(user) {
      console.log("delete id = " + user.id);
      const DeleteUserWithConfirm = document.getElementById("user-" + user.id);
      DeleteUserWithConfirm.remove();
    });
      // Очистити вибране значення і встановити значення "-Please Select-"
      $("#filter_under").prop("selectedIndex", -1).children().first().prop("selected", true); 
      $("#filter").prop("selectedIndex", -1).children().first().prop("selected", true);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    }
  });
  $("#delete-user-modal").modal("hide");
});


//AJAX запит на оновлення і додавання даних у таблиці
const form = $('#updateform');

form.on('submit', function(event) {

    event.preventDefault();
    const formData = form.serialize();

    $.ajax({
      url: './update.php',
      type: 'POST',
      data: formData,
      dataType: 'json',
      success: function(response) {
        
        if (!response.status) {
          const firstNameInput = $('#first-name');
          const lastNameInput = $('#last-name');
          const closeButtClear = $('#add_butt');
          const closeButtDagger = $('.edit_clear');


          if (response.error.message === "Поле ім'я не може містити пробіли") {
            $('.first-name-error').text(response.error.message);
          } else if (response.error.message === "Поле прізвище не може містити пробіли") {
            $('.last-name-error').text(response.error.message);
          } else if (response.error.message === "Поле ім'я не може містити цифри") {
            $('.first-name-error').text(response.error.message);
          } else if (response.error.message === "Поле прізвище не може містити цифри") {
            $('.last-name-error').text(response.error.message);
          } else if (response.error.message === "Поле імя не може бути пустим") {
            $('.first-name-error').text(response.error.message);
          } else if (response.error.message === "Поле прізвище не може бути пустим") {
            $('.last-name-error').text(response.error.message);
          } else {
            firstNameInput.parent().find('.errorfront').text("");
            lastNameInput.parent().find('.errorfront').text("");
          }

          //Очищення полів при закриванні форми
          function clearErrors() {
            firstNameInput.parent().find('.errorfront').text("");
            lastNameInput.parent().find('.errorfront').text("");
          }          

          closeButtClear.on('click', clearErrors);
          closeButtDagger.on('click', clearErrors);
        }


        const data_update = response.user;
        
        const name_first = data_update.name_first;
        const name_last = data_update.name_last;
        const role = data_update.role;
        const status = data_update.status;
        //console.log(status);
        const id = data_update.id;
        const userRow = $('#user-' + id);



        if (!userRow.length) {
        // якщо користувача немає, додаємо його до таблиці
          if (status == '1') {
            statusField_fa_circle = 'active-circle';
          } else if (status == '0') {
            statusField_fa_circle = 'not-active-circle';
          }
          const tbody = $('tbody');
          const newRow = $('<tr></tr>').attr('id', 'user-' + id).html('<td class="align-middle"> <div class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top"> <input type="checkbox" class="custom-control-input checkbox-user new-checkbox" id="item-' + id + '"> <label class="custom-control-label" for="item-' + id + '"></label> </div> </td> <td class="text-nowrap align-middle name-field">' + name_first + ' ' + name_last + '</td> <td class="text-nowrap align-middle role-field"><span>' + role + '</span></td> <td class="text-center align-middle"><i class="fa fa-circle '+ statusField_fa_circle +' "><span data-id="' + id + '" style="display: none;" class="status-field">' + status + '</span></i></td> <td class="text-center align-middle"> <div class="btn-group align-top"> <button id="edit-button-' + id + '" class="btn btn-sm btn-outline-secondary badge edit_clear" type="button" data-toggle="modal" data-id="' + id + '">Edit</button> <button id="delete-button-' + id + '" class="btn btn-sm btn-outline-secondary badge" type="button" data-id="' + id + '"><i class="fa fa-trash"></i></button></div> </td>');
          tbody.append(newRow);
          $('#user-form-modal').modal('hide');
          $(document).ready(function() {
            var clickCounts = {};
            
            $('[id^="edit-button-"]').click(function() {
              var id = $(this).data('id');
              
              $('#user-form-modal').find('#updateform input[name="id"]').val(id);
              //console.log(id);
              $.ajax({
                  url: './proces.php',
                  type: 'POST',
                  data: { new_id: id },
                  success: function(response) {
                    const data_proces = JSON.parse(response);

                    if (data_proces.error !== null && data_proces.error.message === "User with ID " + data_proces.error.new_id + " not found") {
                      $('#error-user-not-found').modal('show');
                      $('#error-user-not-found').find('span.error-id').text(data_proces.error.new_id);
                    }
                    else {
                      $('#user-form-modal').modal('show');

                      const name_first = data_proces.user.name_first;
                      const name_last = data_proces.user.name_last;
                      const role = data_proces.user.role;
                      const toggle = data_proces.user.status;

                      $('#user-form-modal').find('#updateform input[name="first-name"]').val(name_first);
                      $('#user-form-modal').find('#updateform input[name="last-name"]').val(name_last);

                      if (toggle == '1') {
                        $('.toggle-button').prop('checked', true);
                        $('.toggle-button').val('1');
                      } else if (toggle == '0') {
                        $('.toggle-button').prop('checked', false);
                        $('.toggle-button').val('0');
                      }

                      if (role === 'Admin') {
                        $('#role').val('Admin');
                      } else if (role === 'User') {
                        $('#role').val('User');
                      }
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


            //Отримання даних з БД при відкритті модального вікна на видалення, де отримуємо імя і прізвище
            $.ajax({
                url: './proces.php',
                type: 'POST',
                data: { new_id: id },
                success: function(response) {
                  const data_proces = JSON.parse(response);

                  const name_first = data_proces.user.name_first;
                  const name_last = data_proces.user.name_last;

                  $('#delete-user-modal-single').find('span.first-name').text(name_first);
                  $('#delete-user-modal-single').find('span.last-name').text(name_last);

                },
                error: function(jqXHR, textStatus, errorThrown) {
                  console.error(textStatus, errorThrown);
                }
            });

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
          const newCheckbox = $('.new-checkbox');
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

          const updateCheckboxes = () => {
            const allChecked = customCheckboxes.toArray().every(cb => cb.checked) && newCheckbox.prop('checked');
            allItemsCheckbox.prop('checked', allChecked);
          };
          // Установлюю початковий стан newCheckbox, ідентичний allItemsCheckbox
          newCheckbox.prop('checked', allItemsCheckbox.prop('checked'));
          // Коли checkbox змінюється, оновлюю allItemsCheckbox
          $(document).on('change', '.custom-control-input, .new-checkbox', () => {
            updateCheckboxes();
          });
          // Коли вставляється новий checkbox, роблю його стан таким, як у allItemsCheckbox
          $(document).on('DOMNodeInserted', '.new-checkbox', () => {
            const isChecked = allItemsCheckbox.prop('checked');
            $(event.target).prop('checked', isChecked);
          });
          // Коли будь-який checkbox буде видалено, перевіряю, чи всі checkbox встановлено, і оновлюю allItemsCheckbox
          $(document).on('DOMNodeRemoved', '.custom-control-input, .new-checkbox', () => {
            updateCheckboxes();
          });
          // Коли allItemsCheckbox змінюэться, оновлюю усі інші checkbox
          allItemsCheckbox.on('change', () => {
            customCheckboxes.prop('checked', allItemsCheckbox.prop('checked'));
            newCheckbox.prop('checked', allItemsCheckbox.prop('checked'));
          });
          updateCheckboxes();

          // Заміна add user на edit user
          $(document).ready(function() {
            $('[id^="edit-button-"]').click(function() {
              $('#UserModalLabel').text('Edit user');
            });
            $('button#add_butt').click(function() {
              $('#UserModalLabel').text('Add user');
            });
          });

        }        
        else {
        // якщо користувач вже існує, оновлюємо інформацію про нього
          const nameField = userRow.find('.name-field');
          const roleField = userRow.find('.role-field');
          const statusField = userRow.find('.status-field');
          const statusField_fa_circle = userRow.find('.fa-circle');

          nameField.html(name_first + ' ' + name_last);
          roleField.html(role);
          statusField.html(status);
          

          if (status == '1') {
            statusField_fa_circle.addClass('active-circle').removeClass('not-active-circle');
          } else if (status == '0') {
            statusField_fa_circle.addClass('not-active-circle').removeClass('active-circle');
          }
          $('#user-form-modal').modal('hide');          
        }        
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });
  
});

//AJAX запит на видалення даних у таблиці (працює)
$('[id^="delete-button-"]').click(function() {
  var id = $(this).data('id');
  $('#delete-user-modal-single').modal('show');
  $('#delete-user-modal-single').css('display', 'block').removeAttr('aria-hidden');

  //Отримання даних з БД при відкритті модального вікна на видалення, де отримуємо імя і прізвище
  $.ajax({
      url: './proces.php',
      type: 'POST',
      data: { new_id: id },
      success: function(response) {
        const data_proces = JSON.parse(response);
        //console.log(data_proces.user);        
        const name_first = data_proces.user.name_first;
        const name_last = data_proces.user.name_last;

        $('#delete-user-modal-single').find('span.first-name').text(name_first);
        $('#delete-user-modal-single').find('span.last-name').text(name_last);

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error(textStatus, errorThrown);
      }
  });

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
    
    $('#user-form-modal').find('#updateform input[name="id"]').val(id);
    //console.log(id);
    $.ajax({
        url: './proces.php',
        type: 'POST',
        data: { new_id: id },
        success: function(response) {
          const data_proces = JSON.parse(response);

          //console.log(data_proces.error.message);
          if (data_proces.error !== null && data_proces.error.message === "User with ID " + data_proces.error.new_id + " not found") {
            $('#error-user-not-found').modal('show');
            $('#error-user-not-found').find('span.error-id').text(data_proces.error.new_id);
          }
          else {
            $('#user-form-modal').modal('show');
          
            const name_first = data_proces.user.name_first;
            const name_last = data_proces.user.name_last;
            const role = data_proces.user.role;
            const toggle = data_proces.user.status;

            $('#user-form-modal').find('#updateform input[name="first-name"]').val(name_first);
            $('#user-form-modal').find('#updateform input[name="last-name"]').val(name_last);

            if (toggle == '1') {
              $('.toggle-button').prop('checked', true);
              $('.toggle-button').val('1');
            } else if (toggle == '0') {
              $('.toggle-button').prop('checked', false);
              $('.toggle-button').val('0');
            }

            if (role === 'Admin') {
              $('#role').val('Admin');
            } else if (role === 'User') {
              $('#role').val('User');
            }
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
        }
    });
  });
});
