window.addEventListener('load', carregado);
// window.addEventListener('addBanco', salvar);

var db;
function carregado(){
    db = openDatabase("calculador", "1.0", "app de calculo da nota para passar", 2 * 1024 * 1024);
    db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS disciplinas ( id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,nome TEXT,n_av INTEGER)" );   
    // tx.executeSql("INSERT INTO disciplinas (nome,n_av) VALUES ('b', 2)");
    //tx.executeSql("DROP TABLE disc" );
    });
};

function get_action(form) {
    
    var id = document.getElementById('field-id').value;
    var nome = document.getElementById('field-name').value;
    var n_av = document.getElementById('field-n_av').value;
    // console.log(db); 
    db.transaction(function(tx) {
    tx.executeSql('INSERT INTO disciplinas (nome,n_av) VALUES (?, ?)', [nome,n_av]);
    });
};


           