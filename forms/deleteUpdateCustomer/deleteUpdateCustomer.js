
deleteUpdateCustomer.onshow=function(){
    drpCompany1.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query)
  
    if (req1.status == 200) { //transit worked.
       results = JSON.parse(req1.responseText)
    
       //get the array
       if (results.length == 0)
           txtDetails1.value("Error, no companies found.")
       else {        
           let message = ""
           for (i = 0; i <= results.length - 1; i++){
               message = message + results[i][0] + "\n"
               drpCompany1.addItem(results[i][0])
           }
       } 
   }
  hmbMenu1.clear()
  hmbMenu1.addItem("See Customer")
  hmbMenu1.addItem("Delete Customer")
  hmbMenu1.addItem("Edit Customer")
  hmbMenu1.addItem("Add Customer")
}



drpCompany1.onclick=function(s){
  if (typeof(s) == "object"){  
    return                     
  } else {
    drpcompany1.value = s   
  }
}

btnSubmit.onclick=function(){
if (rdoUpdateOrDelete.value ==0){





  let dName = drpCompany1.value
    
    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        if (dName == results[i][0])
            found = true
    }
    if (found == false) 
       NSB.MsgBox("That company is not in the database.")
    else if (found == true) {
      let queryDelete = "DELETE FROM customer WHERE name = " + '"' + dName + '"'
      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + queryDelete)

      if (req4.status == 200) { 
        if (req4.responseText == 500){    
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let query4="SELECT name FROM customer"
                req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query4)

                if (req5.status==200){
                  //transaction works
                  results=JSON.parse(req5.responseText)
                  
                  
                  let message = ""
                  for (i=0; i <= results.length-1; i++)
                      message = message + results[i][0] + "\n"
                  txtDetails1.value = message
                
                }else{
                  NSB.MsgBox("Error code: " + req1.status)
                }
            }
            
        }else{
            NSB.MsgBox("There was a problem deleting " + dName + " from the database.")
        }
      } else {
        // transit error
        NSB.MsgBox("Error: " + req5.status);
      }  
  } 





}else if (rdoUpdateOrDelete.value == 1){
   let oldName = drpCompany1.selection
   let newName = iptNewCompany.value
   let query2 = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
   
   req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query2)
   
   if (req2.status == 200) { 
        if (req2.responseText == 500) {   
            var result2 = JSON.parse(req2.responseText)
            
            let query3 = "SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query3)
            
            if (req3.status == 200) { //transit worked.
               let results3 = JSON.parse(req3.responseText)
               //get the array
               if (results3.length == 0)
                     txtDetails1.value("There is no company that matches.")
                else {        
                   console.log("the parsed JSON is for result3 is " + results3)
                   console.log("eg. temp[0] or first row in big array is " + results3[0][0])
          
                   let message2 = ""
                   for (i = 1; i <= results3.length-1; i++)
                     message2 = message2 + results3[i] + "\n"
                     
                  txtDetails1.value=message2
                 } 
           }else
               NSB.MsgBox("Error")
            
      } else
          NSB.MsgBox("There was a problem changing the company name.")

    } 
  }
}

hmbMenu1.onclick=function(s){
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