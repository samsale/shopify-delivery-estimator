// Default delivery length
  let deliveryLength = 5
  
  //loop through Shopify tags and find the delivery key & value pair
  let tags = {{product.tags|json}}
      for(let i of tags){
        if(i.startsWith("delivery:")){
           deliveryLength = i.split(':')[1];          
           }
      }

	const daysOfTheWeek = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	const monthNames = ["January", "February", "March", "April", "May", "June",
  						"July", "August", "September", "October", "November", "December"
						]
    
	let dateText = document.getElementById('delivery-date');	
	var estimatedDeliveryDate = new Date()

function isItPastCutOffTime(){
  var currentDate = new Date()
	// create atoday date object at 1300 
  var cutOffDate = new Date(currentDate.getFullYear(),currentDate.getMonth(), currentDate.getDate(), 13, 30, 0, 0);
  var timer_time = Math.round((cutOffDate - currentDate) / 60000);
  //if it is past 1300, take it to the next day
  if (timer_time <= 0){
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() +1);
  }
  //if it is Saturday, add two days to take it to Monday
  if (estimatedDeliveryDate.getDay() === 6){
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 2);
  //if it is Sunday, add one day to take it to Monday
  }else if (estimatedDeliveryDate.getDay() === 0){
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 1);
  }
}

function checkDayOfWeek(){
  let i = 1;
  while (i <= deliveryLength){
    //if the next day is a Saturday add two to make it Monday
    if ((estimatedDeliveryDate.getDay()) === 5){
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 2);
      //if the next day is a Sunday add one to make it Monday
    }else if((estimatedDeliveryDate.getDay()) === 6){
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 1);
      //else is is a week day so add one day and increment the counter
    }else{
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 1);
      // we only count week days as potential delivery day
      i++
    }
  }
}

function formatDate(){
  //get the day of the week as a word from the array
  let day = daysOfTheWeek[estimatedDeliveryDate.getDay()]
  ////get the month of the year as a word from the array
  let month = monthNames[estimatedDeliveryDate.getMonth()]
  //return format string
  return `Free Delivery by ${day} ${estimatedDeliveryDate.getDate()} ${month}`

}
  

isItPastCutOffTime()
checkDayOfWeek()
let dateString = formatDate()
//update webpage with string
dateText.innerHTML = dateString
