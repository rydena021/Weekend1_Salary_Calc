class Employee {
  constructor(firstName, lastName, employeeId, title, annualSalary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.employeeId = employeeId;
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

$(readyNow);


function addEmployee() {
  if ($('#firstNameIn').val() === '' || $('#lastNameIn').val() === '' || $('#employeeIdIn').val() === '' || $('#titleIn').val() === '' || $('#annualSalaryIn').val() === '') {
    alert("All fields mandatory.");
  } else if (!idIsValid()) {
    alert("Please enter a unique 4-digit employee ID.");
  } else {
    const newEmployee = new Employee(
      $('#firstNameIn').val(),
      $('#lastNameIn').val(),
      Number($('#employeeIdIn').val()),
      $('#titleIn').val(),
      Number($('#annualSalaryIn').val())
      );
      // reset input fields
      $('#firstNameIn').val('');
      $('#lastNameIn').val('');
      $('#employeeIdIn').val('');
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
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
} // end currencyFormat

function deleteEmployee() {
  let employeeId = $(this).closest('tr').find("td.id").text();
  for (let i = 0; i < employees.length; i++) {
    if (employeeId == employees[i].employeeId) {
      employees.splice(i, 1);
    }
  }
  displayEmployees();
  updateBudget();
} // end deleteEmployees

function displayEmployees() {
  $('tbody').empty();
  for (const employee of employees) {
    $('tbody').append(`
    <tr>
    <td>${employee.firstName}</td>
    <td>${employee.lastName}</td>
    <td class="id">${employee.employeeId}</td>
    <td>${employee.title}</td>
    <td>${currencyFormat(employee.annualSalary)}</td>,
    <td><a class="btn deleteEmployeeButton"><i class="fas fa-trash-alt"></i></a></td>
    </tr>
    `);
  }
  $('.deleteEmployeeButton').on('click', deleteEmployee);
} // end displayEmployees

function idIsValid() {
  for (const employee of employees) {
    if ($('#employeeIdIn').val() == employee.employeeId || $('#employeeIdIn').val().length != 4) {
      return false;
    }
  }
  return true;
} // end idIsValid

function readyNow() {
  $('#addEmployeeButton').on('click', addEmployee);
  displayEmployees();
  updateBudget();
} // end readyNow

function updateBudget() {
  let totalCost = 0;
  for (const employee of employees) {
    totalCost += employee.monthlySalary;
  }
  $('#budgetDisplay').text(`Monthly Cost: ${currencyFormat(totalCost)}`);
  if (totalCost > 20000) {
    $('#budgetDisplay').addClass('negative');
  }
} // end updateBudget
