window.addEventListener('load', carregado);

var db = openDatabase("calc", "1.0", "TiPS Database Example", 2 * 1024 * 1024);



function carregado(){    
    
    document.getElementById('btn-salvar').addEventListener('click', salvar);
    document.getElementById('btn-deletar').addEventListener('click', deletar);
    
    db.transaction(function(tx) {
        //tx.executeSql("DROP TABLE disc" );
        tx.executeSql("CREATE TABLE IF NOT EXISTS disc ( id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT ,nome STRING,n_av INTEGER)" );
//        tx.executeSql('INSERT INTO disc ( nome,n_av,email) VALUES ("a", "b", "c")');
    });
    
    mostrar();
    
}   

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

    mostrar();
    limpaCampo();
    inputSHOW(false);
}

function mostrar(){        
    var table = document.getElementById('tbody-register');

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM disc', [], function (tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for(var i = 0; i < rows.length; i++){
                    tr += '<tr>';
                    tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].nome + '</td>';
                    tr += '<td>' + rows[i].n_av + '</td>';
                    
                    tr += '</tr>';                   
            }
                table.innerHTML = tr; 

        }, null);
    });
}

function atualizar(_id){   
    
    var id = document.getElementById('field-id');
    var nome = document.getElementById('field-name');
    var n_av = document.getElementById('field-n_av');
   
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM disc WHERE id=?', [_id], function (tx, resultado) {
            var rows = resultado.rows[0];

            nome.value = rows.nome ;
            n_av.value = rows.n_av ;
           
        });
    });
    inputSHOW(true);
}

function deletar(){
    
    var id = document.getElementById('field-id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM disc WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
}