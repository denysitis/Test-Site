<?php 
    require_once('./DB.php');
    require_once('./function.php');
    require_once('./proces.php');    
    require_once('./update.php');
    require_once('./delete.php');
    require_once('./checked-toggle.php');
  ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Users table</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.1/dist/js/bootstrap.bundle.min.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
</head>
<body>
  <?php $back_data_view = view_DB($connect); ?>
  <div class="container">
    <div class="container">
      <div class="row flex-lg-nowrap">
        <div class="col mb-3">        
          <form>
            <div class="row card center_row">
              <div class="form-group margin_form">
                <label for="filter" class="col-form-label">Filter:</label>
                <select name="filter" id="filter">
                    <option selected="true" disabled="disabled">-Please Select-</option>
                    <option value="Set-active">Set active</option>
                    <option value="Set-not-active">Set not active</option>
                    <option value="Delete">Delete</option>
                </select>
              </div>
              <div class="form-group margin_form">
                  <button type="submit" id="buttOK" class="btn btn-sm btn-outline-secondary badge" data-target="#delete-user-modal">
                    OK
                  </button>
              </div>
              <div class="margin_form">
                <button id="add_butt" class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">
                  Add
                </button>
              </div>
            </div>        
          </form>
        </div>      
      </div>
    </div>
    <div class="row flex-lg-nowrap">
      <div class="col">
        <div class="row flex-lg-nowrap">
          <div class="col mb-3">
            <div class="e-panel card">
              <div class="card-body">
                <div class="card-title">
                  <h6 class="mr-2"><span>Users</span></h6>
                </div>
                <div class="e-table">
                  <div class="table-responsive table-lg mt-3">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th class="align-top">
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0">
                              <input type="checkbox" class="custom-control-input" id="all-items">
                              <label class="custom-control-label" for="all-items"></label>
                            </div>
                          </th>
                          <th class="max-width">Name</th>
                          <th class="sortable">Role</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>  

                      <tbody>
                        <?php
                        foreach ($back_data_view as $value) 
                        {                        
                        ?>
                        <tr id="user-<?= $value['id']; ?>">
                          <td class="align-middle">
                            <div
                              class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
                              <input type="checkbox" class="custom-control-input checkbox-user" id="item-<?= $value['id']; ?>">
                              <label class="custom-control-label" for="item-<?= $value['id']; ?>"></label>
                            </div>
                          </td>
                          <td class="text-nowrap align-middle name-field"><?= $value['First_Name'] . ' ' . $value['Last_Name']; ?></td>
                          <td class="text-nowrap align-middle role-field"><span><?= $value['Role']; ?></span></td>
                          <td class="text-center align-middle"><i class="fa fa-circle not-active-circle"><span data-id="<?= $value['id']; ?>" style="display: none;" class="status-field"><?= $value['Togge']; ?></span></i></td>
                          <td class="text-center align-middle">
                            <div class="btn-group align-top">
                                   
                              <button id="edit-button-<?= $value['id']; ?>" class="btn btn-sm btn-outline-secondary badge edit_clear" type="button" data-toggle="modal" data-id="<?= $value['id']; ?>">Edit</button> 
                              
                              <button id="delete-button-<?= $value['id'] ?>" class="btn btn-sm btn-outline-secondary badge" type="button" data-id="<?= $value['id']; ?>"><i class="fa fa-trash"></i></button>
                              
                            </div>
                          </td>
                        </tr>                                                
                      <?php 
                        }
                       ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row flex-lg-nowrap">
            <div class="col">        
              <form>
                <div class="row card center_row">
                  <div class="form-group margin_form">
                    <label for="filter" class="col-form-label">Filter:</label>
                    <select name="filter" id="filter_under">
                        <option selected="true" disabled="disabled">-Please Select-</option>
                        <option value="Set-active-under">Set active</option>
                        <option value="Set-not-active-under">Set not active</option>
                        <option value="Delete-under">Delete</option>
                    </select>
                  </div>
                  <div class="form-group margin_form">
                      <button type="submit" id="buttOKunder" class="btn btn-sm btn-outline-secondary badge" data-target="#delete-user-modal-under">
                        OK
                      </button>
                  </div>
                  <div class="margin_form">
                      <button id="add_butt" class="btn btn-sm btn-outline-secondary badge" type="button" data-toggle="modal" data-target="#user-form-modal">
                      Add
                    </button>
                  </div>
                </div>        
              </form>
            </div>      
          </div>
        </div>
        <!-- User Form Modal -->
        <div class="modal fade" id="user-form-modal" tabindex="-1" aria-labelledby="user-form-modal" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="UserModalLabel">Add user</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                   
                <form id="updateform" method="POST">
                  <div>
                    <input type="hidden" name="id" value="">
                  </div>
                  <div class="form-group">
                    <label for="first-name" class="col-form-label">First Name:</label>
                    <input type="text" name="first-name" class="form-control" id="first-name" value="">
                    
                    <div class="errorfront first-name-error"></div>
                  </div>
                  <div class="form-group">
                    <label for="last-name" class="col-form-label">Last Name:</label>
                    <input type="text" name="last-name" class="form-control" id="last-name" value="">
                    
                    <div class="errorfront last-name-error"></div>
                  </div>
                  <div class="form-group status_block">
                    <label for="toggle-button-status" class="col-form-label">Status:</label>
                    <input type="hidden" name="toggle" value="0">
                    <input type="checkbox" name="toggle" id="toggle-button-status" class="toggle-button" value="1">
                  </div>
                  <div class="form-group">
                    <label for="role" class="col-form-label">Role:</label>
                    <select name="role" id="role">
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                  </div>
                  
                </form>              
              </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" form="updateform" class="btn btn-primary">Save</button>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- Поп-ап вікна -->
<div class="modal fade" id="delete-user-modal" tabindex="-1" aria-labelledby="delete-user-modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="delete-user-modal-label">Видалити користувача?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Ви впевнені, що хочете видалити цього користувача(ів)?
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ні</button>
        <button type="button" id="confirm-delete-user" class="btn btn-danger">Так</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="delete-user-modal-single" tabindex="-1" aria-labelledby="delete-user-modal-single" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="delete-user-modal-label">Видалити користувача?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Ви впевнені, що хочете видалити користувача <span class="first-name"></span> <span class="last-name"></span>?
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ні</button>
        <button type="button" id="confirm-delete-user-single" class="btn btn-danger">Так</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="none-reaction-and-user" tabindex="-1" aria-labelledby="none-reaction-and-user" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="none-reaction-and-user-label">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Будь ласка, виберіть користувача(ів) і дію
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">ОК</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="select-an-action-modal" tabindex="-1" aria-labelledby="select-an-action-modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="select-an-action-modal-label">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Будь ласка, виберіть дію
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">ОК</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="select-an-user-modal" tabindex="-1" aria-labelledby="select-an-user-modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="select-an-user-modal-label">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Будь ласка, виберіть користувача(ів)
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">ОК</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="error-user-not-found" tabindex="-1" aria-labelledby="error-user-not-found" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="error-user-not-found-label">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Користувача з ID <span class="error-id"></span> не знайдено!
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">ОК</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="error-users-not-found" tabindex="-1" aria-labelledby="error-users-not-found" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="error-users-not-found-label">Warning</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
          Користувача(ів) зі списку не існує!
        </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal" aria-label="Close">ОК</button>
      </div>
    </div>
  </div>
</div>

<script src="./js/main.js"></script>
</body>
</html>