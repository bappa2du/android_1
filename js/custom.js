
$('#country').on('keyup',function(){

	var country = $(this).val();
	// alert(country);
	
	if(country.length >= 3){
		$('.search_result').html('<h3 class="text-center"><i class="fa fa-cog fa-spin"></i> Loading...</h3>');
		var countryList = $.get('https://restcountries.eu/rest/v1/name/'+country);
		countryList.done(function(result){
			var result1 = '<div class="list-group">';
			$.each(result,function(i,e){
				result1 +=  '<button type="button" class="list-group-item" data-code="'+e.alpha2Code+'" style="border-radius:0px">'+e.name+'<span class="badge">';
				result1 += e.capital+'</span><br/>Phonecode: '+e.callingCodes+'</button>';
			});
			
			if(result.length == 0){
				result1 +=  '<button type="button" class="list-group-item">No Country Found</button>';
			}
			result1 += '</div>';
			$('.search_result').html(result1);
		});
		countryList.fail(function(){
			$('.search_result').html('<h2 class="text-center text-danger"><i class="fa fa-times"></i> Wrong keywords</h2>');
		});
	}else if(country.length < 3){
		$('.search_result').html('');
	}
});

$('body').on('click','.list-group-item',function(){
	$('#country_details').modal('show');
	$('.modal-body').html('<h2 class="text-center"><i class="fa fa-spinner fa-pulse"></i> Loading...</h2>');
	var alpla2 = $(this).data('code');
	var countryDetails = $.get('https://restcountries.eu/rest/v1/alpha/'+alpla2);
	countryDetails.done(function(result){
		var div = '<div class="row"><div class="col-xs-12"><table class="table table-bordered table-striped">'
		div += '<tr><td>Country Name </td><td><strong>'+result.name+'</strong></td></tr>';
		div += '<tr><td>Flag </td><td><img src="flag/'+result.alpha2Code+'.png"></td></tr>';
		div += '<tr><td>Capital </td><td><strong>'+result.capital+'</strong></td></tr>';
		div += '<tr><td>Region </td><td><strong>'+result.region+'</strong></td></tr>';
		div += '<tr><td>Population </td><td><strong>'+result.population+'</strong></td></tr>';
		div += '<tr><td>Area </td><td><strong>'+result.area+'</strong></td></tr>';
		div += '<tr><td>Native Name </td><td><strong>'+result.nativeName+'</strong></td></tr>';
		div += '<tr><td>Alpha2Code </td><td><strong>'+result.alpha2Code+'</strong></td></tr>';
		div += '<tr><td>Alpha3Code </td><td><strong>'+result.alpha3Code+'</strong></td></tr>';
		div += '<tr><td>Phonecode </td><td><strong>'+result.callingCodes+'</strong></td></tr>';
		div += '<tr><td>Currency </td><td><strong>'+result.currencies+'</strong></td></tr>';
		div += '</table>';
		div += '<div class="col-xs-offset-4 col-xs-4"><button data-dismiss="modal" class="btn btn-info">Close</button></div></div></div>';
		$('.modal-body').html(div);
		
	});

});

$(function(){
	var status = setInterval(function(){
		var data = $.get('https://restcountries.eu/rest/v1/name/bangladesh').fail(function(){
			$('.alert').css('display','block');
		});
		data.done(function(){
			$('.alert').css('display','none');
			clearInterval(status);
		});
	},2000);
});
