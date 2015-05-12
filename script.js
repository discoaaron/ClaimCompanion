// Full name		Code   Weight
// Inbound medical 	IB 		29
// Outbound Medical OB 		18
// Property/ Other	PO 		9
// Cancellation 	CN		7

// Possible actions match with top eg. 'IBPaid'
// Paid 			Paid
// Declined			Decl
// Deferred			Def
// On Hold			Hold

// Load the stored totals in the view
window.addEventListener('load', function() 
{
	ResetView();
});

function DoWorkSon(type)
{
		// Check browser support
	if (typeof(Storage) != "undefined") 
	{
		IncrementSpecificNumber(type);
		
		// If Hold don't update total
		if (!checkIfHold(type))
		{
			IncrementSpecificNumber('TotalNumber');
		}
		CalculateTotalPercentage(type);
		UpdateTotals();
	} 
	else 
	{
		$('#Error').text('Sorry, your browser does not support Web Storage...');
	}
}

function IncrementSpecificNumber(type)
{
		var currentTotal = getLocalStorageInt(type);
		localStorage.setItem(type, currentTotal += 1);
		$('#' + type).text(localStorage.getItem(type));
}

function CalculateTotalPercentage(type) 
{
	// Don't update the total if a claim is put on hold
	if (checkIfHold(type))
	{
		return;
	}	
	
	//Get the current total percentage
	var total = getLocalStorageInt('GrandTotal');

	// get the start of the type string
	var code = type.substring(0, 2);
	
	switch(code) 
	{
		case 'IB':
			total += 100/29;
			break;
		case 'OB':
			total += 100/18;
			break;
		case 'PO':
			total += 100/9;
			break;
		case 'CN':
			total += 100/7;
			break;
		default:
			total = 'dafaq did you get here?'
	}
	localStorage.setItem('GrandTotal', total);
}


function ResetView() 
{
	if (localStorage.getItem('TotalNumber') != 0)
	{
		ResetData();
	}
	
	$('#IBPaid').text(localStorage.getItem('IBPaid'));
	$('#IBDecl').text(localStorage.getItem('IBDecl'));
	$('#IBDef').text(localStorage.getItem('IBDef'));
	$('#IBHold').text(localStorage.getItem('IBHold'));

	$('#OBPaid').text(localStorage.getItem('OBPaid'));
	$('#OBDecl').text(localStorage.getItem('OBDecl'));
	$('#OBDef').text(localStorage.getItem('OBDef'));
	$('#OBHold').text(localStorage.getItem('OBHold'));
	
	$('#POPaid').text(localStorage.getItem('POPaid'));
	$('#PODecl').text(localStorage.getItem('PODecl'));
	$('#PODef').text(localStorage.getItem('PODef'));
	$('#POHold').text(localStorage.getItem('POHold'));
	
	$('#CNPaid').text(localStorage.getItem('CNPaid'));
	$('#CNDecl').text(localStorage.getItem('CNDecl'));
	$('#CNDef').text(localStorage.getItem('CNDef'));
	$('#CNHold').text(localStorage.getItem('CNHold'));
	
	UpdateTotals();
}

function ResetDataWithConfirmation() 
{
	if(confirm("Do you want to reset your Claim Companion?"))
	{
		ResetData();
	}
}

function ResetData() 
{
	localStorage.setItem('IBPaid', 0);	
	localStorage.setItem('IBDecl', 0);	
	localStorage.setItem('IBDef', 0);	
	localStorage.setItem('IBHold', 0);	

	localStorage.setItem('OBPaid', 0);	
	localStorage.setItem('OBDecl', 0);	
	localStorage.setItem('OBDef', 0);	
	localStorage.setItem('OBHold', 0);
		
	localStorage.setItem('POPaid', 0);	
	localStorage.setItem('PODecl', 0);	
	localStorage.setItem('PODef', 0);	
	localStorage.setItem('POHold', 0);	
	
	localStorage.setItem('CNPaid', 0);	
	localStorage.setItem('CNDecl', 0);	
	localStorage.setItem('CNDef', 0);	
	localStorage.setItem('CNHold', 0);	
	
	localStorage.setItem('TotalNumber', 0);
	localStorage.setItem('GrandTotal', '0%');
	ResetView();
}

function UpdateTotals()
{
	$('#TotalNumber').text(localStorage.getItem('TotalNumber'));
	// Some fancy logic to display a nice looking percentage
	var grandTotal = parseFloat(localStorage.getItem('GrandTotal')).toFixed(2)
	$('#GrandTotal').text(grandTotal + '%');
	$('#progressBar').css("width", grandTotal + '%')
}

function getLocalStorageInt(type)
{
	var number = parseFloat(localStorage.getItem(type));
		
	// set to 0 if unassigned
	if(!number)
	{
		number = 0;
	}
	return number;
}
	
function checkIfHold(type)
{
	if (type.substring(2, 6) == 'Hold')
	{
		return true;
	}
	return false;
}

