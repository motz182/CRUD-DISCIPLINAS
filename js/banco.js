window.addEventListener('load', carregado);

var db = openDatabase("calculador", "1.0", "app de ", 2 * 1024 * 1024);

db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS disciplinas ( id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT ,nome TEXT,n_av INTEGER)" );   
    tx.executeSql("INSERT INTO disciplinas ( nome,n_av) VALUES ('b', 2)");

});

function carregado(){    

    db.transaction(function(tx) {
        //tx.executeSql("DROP TABLE disc" );
       
    })
};
window.addEventListener('init', function(event) {
  var page = event.target;
      if (page.id === 'page2') {
        page.querySelector('#btn-salvar').onclick = function() {

            function salvar(){
                var id = document.getElementById('field-id').value;
                var nome = document.getElementById('field-name').value;
                var n_av = document.getElementById('field-n_av').value;
               
                db.transaction(function(tx) {
                    if(id){
                        tx.executeSql('UPDATE disc SET nome=?, n_av=? WHERE id=?', [nome,n_av,id],null);
                    }else{
                        tx.executeSql('INSERT INTO disc (nome,n_av) VALUES (?, ?)', [nome,n_av]);
                    }
                });
            }
        };
      }
});
