document.getElementById('save-button').onclick = function () {
  saveAge();
};

chrome.storage.sync.get('savedDate', ({ savedDate }) => {
  if (savedDate != undefined && savedDate != NaN && savedDate != null) {
    setAge(savedDate);
    document.getElementById('date-picker').value = savedDate;
  }
});

function saveAge() {
  var startDate = document.getElementById('date-picker').value;
  if (
    !(
      startDate == undefined ||
      startDate == NaN ||
      startDate == null ||
      startDate == ''
    )
  ) {
    if (new Date(startDate).getTime() > new Date().getTime()) {
      console.log('Error.');
    } else {
      chrome.storage.sync.set({ savedDate: startDate }, function () {
        if (chrome.runtime.error) {
          console.log('Error.');
        }
      });
      setAge(startDate);
    }
  }
}

function setAge(startDate) {
  var age = findAge(new Date(startDate));
  document.getElementById('age').innerText = age + '\nOld';
}

// function to calculate current age
function findAge(startDate) {
  var today = new Date();
  current_date = today.getDate() + 1;
  current_month = today.getMonth();
  current_year = today.getFullYear();
  birth_date = startDate.getDate() + 1;
  birth_month = startDate.getMonth();
  birth_year = startDate.getFullYear();

  month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (birth_date > current_date) {
    current_date = current_date + month[birth_month - 1];
    current_month = current_month - 1;
  }

  if (birth_month > current_month) {
    current_year = current_year - 1;
    current_month = current_month + 12;
  }

  var calculated_date = current_date - birth_date;
  var calculated_month = current_month - birth_month;
  var calculated_year = current_year - birth_year;

  return (
    calculated_year + 'Y ' + calculated_month + 'M ' + calculated_date + 'D '
  );
}
