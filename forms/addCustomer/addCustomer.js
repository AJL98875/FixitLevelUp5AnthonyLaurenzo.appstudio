
addCustomer.onshow=function(){
    listCompany.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query)
    
  if (req1.status == 200) { //transit worked.
    results = JSON.parse(req1.responseText)
    
    //get the array
    if (results.length == 0)
        MSB.MsgBox("There are no company name.")
    else {        
      
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = results[i][0] 
            listCompany.addItem(message)
        }
     } 
  } 
  hmbMenu2.clear()
  hmbMenu2.addItem("See Customer")
  hmbMenu2.addItem("Delete Customer")
  hmbMenu2.addItem("Edit Customer")
  hmbMenu2.addItem("Add Customer")
}


btnAdd.onclick=function(){
  let newCompany = iptCompany.value
  let newCity = iptCity.value
  let newStreet = iptStreet.value
  let newState = iptState.value
  let newZipCode = iptZipCode.value
  let queryInsert = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('"+newCompany+"', '"+newCity+"', '"+newStreet+"','"+ newState+"'," +newZipCode+")"

    req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2&database=ajl98875&query=" + queryInsert)

    if (req2.status == 200) { 
        if (req2.responseText == 500) {   
            listCompany.clear()
            let message = ""
            let queryNew="SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2&database=ajl98875&query=" + queryNew)
                if (req3.status==200){
                  //transaction works
                  results=JSON.parse(req3.responseText)
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++){
                      message = results[i][0] 
                      listCompany.addItem(message)
                  }
                    
                 let query4 = "SELECT * FROM customer WHERE name=" + '"' + newCompany + '"'
                     
                      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2&database=ajl98875&query=" + query4)
      
                      
                         if (req4.status == 200) { 
                               results = JSON.parse(req4.responseText)
                               
                               let message2 = ""
                               for (i = 1; i <= 5; i++)
                                   message2 = message2 + results[0][i] + ", "
                               modInfo.value = message2
                               modInfo.footer= newCompany
                      }      
                      
                      modInfo.toggle()
               }
            
        }else{
            NSB.MsgBox("There was a problem with adding the company to the database.")
        }
    } else {
        NSB.MsgBox("Error: " + req1.status)
    }  
}

hmbMenu2.onclick=function(s){
  if (typeof(s) == "object") { 
       return
    }
    switch(s) {
      case "See Customer":
          ChangeForm(seeCustomer)
          break
       case "Edit Customer":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customer":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customer":
          ChangeForm(addCustomer)
          break
     }
}