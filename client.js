class Employee {
  constructor(firstName, lastName, employeeID, title, annualSalary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.employeeID = employeeID;
    this.title = title;
    this.annualSalary = annualSalary;
    this.monthlySalary = annualSalary / 12;
  } // end constructor
} // end Employee class

const atticus = new Employee('Atticus', 'Roberts', 3456, 'Barista', 23000);
const jem = new Employee('Jem', 'Johnson', 2236, 'Janitor', 40000);
const scout = new Employee('Scout', 'Anderson', 5996, 'Accountant', 59000);
const robert = new Employee('Robert', 'Davis', 1111, 'Software Developer', 64000);
const mayella = new Employee('Mayella', 'Jones', 9874, 'HR', 51000);

const employees = [atticus, jem, scout, robert, mayella];
let monthlyBudget = 20000;

$(readyNow);

function readyNow() {
  $('#addEmployeeButton').on('click', addEmployee);
  displayEmployees();
  updateBudget();
} // end readyNow

function addEmployee() {
  if ($('#firstNameIn').val() === '' || $('#lastNameIn').val() === '' || $('#employeeIDIn').val() === '' || $('#titleIn').val() === '' || $('#annualSalaryIn').val() === '') {
    alert("All fields mandatory.");
  } else if (!idIsValid()) {
    alert("Please enter a unique 4-digit employee ID.");
  } else {
    const newEmployee = new Employee(
      $('#firstNameIn').val(),
      $('#lastNameIn').val(),
      parseInt($('#employeeIDIn').val()),
      $('#titleIn').val(),
      parseInt($('#annualSalaryIn').val())
    );
    // reset input fields
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#employeeIDIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
    // push to employees array
    employees.push(newEmployee);
    // dislay all employees
    displayEmployees();
    updateBudget();
  }
} // end addEmployee

function currencyFormat(num) {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
} // end currencyFormat

function deleteEmployee() {
  let employeeID = $(this).closest('tr').find("td.id").text();
  for (let i = 0; i < employees.length; i++) {
    if (employeeID == employees[i].employeeID) {
      employees.splice(i, 1);
    }
  }
  displayEmployees();
  updateBudget();
} // end deleteEmployees

function displayEmployees() {
  $('tbody').empty();
  for (const employee of employees) {
    $('tbody').append(`<tr>
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td class="id">${employee.employeeID}</td>
      <td>${employee.title}</td>
      <td>${currencyFormat(employee.annualSalary)}</td>,
      <td><a class="btn" id="deleteEmployeeButton"><i class="fas fa-trash-alt"></i></a></td>
      </tr>`);
  }
  // remove all listeners and reapply
  $(document).off('click', "#deleteEmployeeButton", deleteEmployee);
  $(document).on('click', "#deleteEmployeeButton", deleteEmployee);
} // end displayEmployees

function idIsValid() {
  for (const employee of employees) {
    if ($('#employeeIDIn').val() == employee.employeeID || $('#employeeIDIn').val().length != 4) {
      return false;
    }
  }
  return true;
} // end idIsValid

function updateBudget() {
  let totalCost = 0;
  for (const employee of employees) {
    totalCost += employee.monthlySalary;
  }
  $('#budgetDiv').empty();
  $('#budgetDiv').append(`<h3 id="budgetDisplay" class="text-right">Monthly Cost: ${currencyFormat(totalCost)}</h3>`);
  if (totalCost > 20000) {
    $('#budgetDisplay').addClass('negative');
  }
} // end updateBudget
