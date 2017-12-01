//sequences to be aligned
var seq1="ACTGGGGGTGTGTAGTAGATAGATAG";
var seq2="TAGC" ;
//


function align(seq1, seq2){
	var seq1_len = seq1.length;
	var seq2_len = seq2.length;


	//create multidimensional array
	//len of seq2 is outer array
	var outer_arr = new Array(seq2_len+1);
	//initiaze arrays of len seq1 in each element of outer_arr
	for (var i = 0; i < outer_arr.length; i++) {
        	outer_arr[i]= new Array(seq1_len+1)
	}

	//build the scoring matrix
	//scores
	var match=1
	var miss=-1
	var indel="-"


	
	outer_arr[0][0] = 0;
	
	//populate outer edges(top and left)
	for(var i=1;i<=seq2_len;i++) {
		outer_arr[i][0] = miss * i;
	}

	for(var i=1;i<=seq1_len;i++){
		outer_arr[0][i] = miss * i;
	}

	for(var i=1;i<=seq2_len;i++) {
    		for(var j=1;j<=seq1_len;j++) {
        		outer_arr[i][j] = Math.max(
            		outer_arr[i-1][j-1] + (seq2[i-1] === seq1[j-1] ? match : miss),
            		outer_arr[i-1][j] + miss,
            		outer_arr[i][j-1] + miss
        		);
    		}
	}

	//traverse backwards and build sequences in reverse
	var i = seq2_len;
	var j = seq1_len;
	var new_seq1 = [];
	var new_seq2 = [];

	do {
		var up = outer_arr[i-1][j];
    		var diag = outer_arr[i-1][j-1];
    		var left = outer_arr[i][j-1];
    		var max = Math.max(up, diag, left);

    		switch(max) {
        		case up:
            			i--;
            			new_seq1.push(indel);
            			new_seq2.push(seq2[i]);
            			break;
			case diag:
            			j--;
            			i--;
            			new_seq1.push(seq1[j]);
            			new_seq2.push(seq2[i]);
            			break;
        		case left:
            			j--;
            			new_seq1.push(seq1[j]);
            			new_seq2.push(indel);
            			break;
    			}
	} while(i>0 && j>0);


	return [new_seq1.reverse(), new_seq2.reverse()] ;
}

console.log(align(seq1, seq2));


/*
var seq1_len = seq1.length;
var seq2_len = seq2.length;

//console.log(seq1);


//create multidimensional array
//len of seq2 is outer array
var outer_arr = new Array(seq2_len+1);


//initiaze arrays of len seq1 in each element of outer_arr
for (var i = 0; i < outer_arr.length; i++) {
	outer_arr[i]= new Array(seq1_len+1)
//	console.log(outer_arr[i])
}	


/*initialzie 5x5 2d array representing AGTC- by ACTG-
var outer_letter_array = new Array(5);
for (var i = 0; i < outer_letter_array.length; i++) {
	outer_letter_array[i] = new Array(5)
}
*/

//build the scoring matrix
/*
//scores
var match=1
var miss=-1
var indel="-"

outer_arr[0][0] = 0;

for(var i=1;i<=seq2_len;i++) {
    outer_arr[0][i] = outer_arr[i][0] = -1 * i;
}

for(var i=1;i<=seq2_len;i++) {
    for(var j=1;j<=seq1_len;j++) {
        outer_arr[i][j] = Math.max(
            outer_arr[i-1][j-1] + (seq2[i-1] === seq1[j-1] ? match : miss),
            outer_arr[i-1][j] + miss,
            outer_arr[i][j-1] + miss
        );
    }
}

/*
var as1 = "";
var as2 = "";
*/
/*
console.log(outer_arr);


var i = seq2_len;
var j = seq2_len;
var new_seq1 = [];
var new_seq2 = [];

//find the maxiumum score of each path
do {

    var t = outer_arr[i-1][j];
    var d = outer_arr[i-1][j-1];
    var l = outer_arr[i][j-1];
    var max = Math.max(t, d, l);

    switch(max) {
        case t:
            i--;
            new_seq1.push(indel);
            new_seq2.push(seq2[i]);
            break;
        case d:
            j--;
            i--;
            new_seq1.push(seq1[j]);
            new_seq2.push(seq2[i]);
            break;
        case l:
            j--;
            new_seq1.push(seq1[j]);
            new_seq2.push(indel);
            break;
    }

} while(i>0 && j>0);

console.log(new_seq1.reverse());
console.log(new_seq2.reverse());
*/
