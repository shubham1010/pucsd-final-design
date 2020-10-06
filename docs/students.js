
function load_require() {

  var table_header_elements = document.getElementById("student-info-heading")

  // header for student-information table

  var header = ["name", "course"]
  var header_id = ["course-name"]
 

  var html = `<tr>`

  html += `<th>${header[0]}</th>`

  for(var i=1; i<header.length; i++) {
    html += `<th>
    
    ${header[i]}
    <div class="custom-select">
      <select onchange="selected_${header[i]}()" id="${header_id[i-1]}">
      </select>
      <span class="custom-arrow"></span>
    </div>
    </th>`
  }
    

  html += `</tr>`

  table_header_elements.innerHTML = html

  // option for batches year in dropdown list

  var batch_year = document.getElementById("batch-year");
  var start_year = 2012
  var current_year = 2018

  for(var year=current_year; year>=start_year; year--) {
    batch_year.innerHTML +=  `<option value=${year}>${year}</option>`
  }
  

  // option for courses in dropdown list

  var course_names = ["All", "MCA", "MSc", "MTech"]
  var course_DOM = document.getElementById("course-name")
  for(var course=0; course<course_names.length; course++) {
    course_DOM.innerHTML +=  `<option value=${course_names[course].toLowerCase()}>${course_names[course]}</option>`
  }

  selected_batch()

}



function selected_batch() {
  var batch_year = document.getElementById("batch-year").value
  var course_DOM = document.getElementById("course-name")
  var all_course_options = course_DOM.querySelectorAll("option")

  if (Number(batch_year)>2012) {
    all_course_options[3].style.display = "none"
    course_DOM.selectedIndex = "0";
  }
  else
    all_course_options[3].style.display = ""
  
  load_batch_file(batch_year)
//  selected_course()
}

function load_batch_file(batch_year) {

  var table_header_elements = document.getElementById("student-info-heading")
  var students_info_DOM = table_header_elements.querySelector("tbody")

  // deleting previous batch data
  
  for(; students_info_DOM.childNodes.length!=1 ;) {
    students_info_DOM.childNodes[1].remove()
  }

  // take data from a file
  
  var ourRequest = new XMLHttpRequest();
  var URL = 'https://shubham1010.github.io/jsonfiles/batches/'+batch_year+'.json'

  ourRequest.open('GET', URL, true)
  
  ourRequest.onload = function() {

    var data = JSON.parse(ourRequest.response)
  
    data.sort(function(a, b) {
      return a.name > b.name
    })
    
    var row_index = 1

    for(var i=0; i<data.length; i++) {
      var row = table_header_elements.insertRow(row_index++)
      
      var cell0 = row.insertCell(0)
      var cell1 = row.insertCell(1)

      cell0.innerHTML = data[i].name
      cell1.innerHTML = data[i].course
    }
  
  };
  ourRequest.send()
}


function selected_course() {
  var course_DOM = document.getElementById("course-name");
  var d = course_DOM.value
  
  //table_tag_data = document.getElementsByClassName("table-box")
  var table_tag_data = document.getElementById("student-info-heading")
  var all_tr_tag = table_tag_data.querySelectorAll("tr")

  if (d === "all") {
    for(var i=1; i<all_tr_tag.length; i++) {
        all_tr_tag[i].style.display = ""
    }
    return
  }
  
  for(var i=1; i<all_tr_tag.length; i++) {
    var td_tag = all_tr_tag[i].querySelectorAll("td")
    
    var course = td_tag[1].textContent
    course = course.toLowerCase()
    if (d != course) {
      all_tr_tag[i].style.display = "none";
    }
    else {
      all_tr_tag[i].style.display = ""
    }

  }
}
