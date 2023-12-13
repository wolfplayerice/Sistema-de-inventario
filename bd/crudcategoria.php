<?php
include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$nombrecategoria = (isset($_POST['nombrecategoria'])) ? $_POST['nombrecategoria'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idcategoria = (isset($_POST['idcategoria'])) ? $_POST['idcategoria'] : '';

switch($opcion){
    case 1: //alta
        $consulta = "INSERT INTO categoria (nombrecategoria) VALUES('$nombrecategoria') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 

        $consulta = "SELECT idcategoria, nombrecategoria FROM categoria ORDER BY idcategoria DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 2: //modificación
        $consulta = "UPDATE categoria SET nombrecategoria='$nombrecategoria' WHERE idcategoria='$idcategoria' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT idcategoria, nombrecategoria FROM categoria WHERE idcategoria='$idcategoria' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;        
    case 3://baja
        $consulta = "DELETE FROM categoria WHERE idcategoria='$idcategoria' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;        
}

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;
