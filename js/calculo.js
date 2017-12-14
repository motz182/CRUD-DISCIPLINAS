function calculanota(){
			    var n_av = parseInt(document.getElementById('n_av').value);
			    var media = 60;

			    // var n2 = parseInt(document.getElementById('n2').value);
			    // var n3 = parseInt(document.getElementById('n3').value);
				var calc = (media-(n1+n2+n3));
				document.getElementById('passar').innerHTML = (calc);
			}