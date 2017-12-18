window.addEventListener('load', carregado);
var db;  
function carregado(){
    db = openDatabase("calculador", "1.0", "app de calculo da nota para passar", 1024);
    db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS disciplinas ( id INTEGER PRIMARY KEY AUTOINCREMENT,nome TEXT,n_av INTEGER)" );   
    // tx.executeSql("INSERT INTO disciplinas (nome,n_av) VALUES ('b', 2)"); um teste de insert 
    //tx.executeSql("DROP TABLE disc" );
    });
}

function get_action(form) {  

    // var id = document.getElementById('field-id').value;
    var nome = document.getElementById('field-name').value;
    var n_av = document.getElementById('field-n_av').value;
    
    if(nome == null || nome == "") {
         alert("O nome é obrigatório!");
          return false;
        }
        if(n_av == null || n_av == "") {
          alert("O numero de avaliacoes é obrigatório!");
          return false;
        }
    console.log(db); 
    db.transaction(function(tx) {
    tx.executeSql('INSERT INTO disciplinas (nome,n_av) VALUES (?, ?)', [nome,n_av]);
    });
};


           