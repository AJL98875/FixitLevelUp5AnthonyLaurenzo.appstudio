//Property Changes
//1. Change the background to Green
//2. borderStyle groove
//3. textArea place holder deleted
//4. all controls renamed for values
//5. New headers for textarea control
//6. Background color blue on other form
//7. Background color red on final form

seeCustomer.onshow=function(){
  drpCompany.clear()
  let query = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query)
  
  if (req1.status == 200) { 
    let results = JSON.parse(req1.responseText)
    
    //get the array
    if (results.length == 0)
        txtDetails.value("Error, no companies found.")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = message + results[i][0] + "\n"
            drpCompany.addItem(results[i][0])
        }
     } 
  } 
  hmbMenu.clear()
  hmbMenu.addItem("See Customer")
  hmbMenu.addItem("Delete Customer")
  hmbMenu.addItem("Edit Customer")
  hmbMenu.addItem("Add Customer")
}




drpCompany.onclick=function(s){
    if (typeof(s) == "object"){  
    return                    
    }else {
      drpCompany.value = s   
      
      
      let query2 = "SELECT * FROM customer WHERE name=" + '"' + drpCompany.selection + '"' 
      req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=ajl98875&pass=Stlouiesunsv2@&database=ajl98875&query=" + query2)
      
      
      if (req2.status == 200) { 
          let results2 = JSON.parse(req2.responseText)
        
          //get the array
          if (results2.length == 0){
              txtDetails.value("There are no company of that type.")
          }else {        
              console.log("the parsed JSON is " + results2)
              console.log("eg. temp[0] or first row in big array is " + results2[0])
              console.log("to get to Paul, need results[0][1]: " + results2[0][2])
              // output the names of all the dogs
              let message2 = ""
              for (i = 1; i <= 2; i++)
                  message2 = message2 + results2[0][i] + "\n"
              for (i =3; i <=5; i++)
                  message2 = message2 + results2[0][i] + ", "
              txtDetails.value = message2
          } 
      }
   }
}

hmbMenu.onclick=function(s){
    if (typeof(s) == "object") { // do nothing
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


