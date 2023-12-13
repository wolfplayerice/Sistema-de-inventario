<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$nombre_client = (isset($_POST['nombre_client'])) ? $_POST['nombre_client'] : '';
$apellido_client = (isset($_POST['apellido_client'])) ? $_POST['apellido_client'] : '';
$cedula = (isset($_POST['cedula'])) ? $_POST['cedula'] : '';
$idcedula = (isset($_POST['idcedula'])) ? $_POST['idcedula'] : '';
$nombretipo = (isset($_POST['nombretipo'])) ? $_POST['nombretipo'] : '';
$tlf_client = (isset($_POST['tlf_client'])) ? $_POST['tlf_client'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idcliente = (isset($_POST['idcliente'])) ? $_POST['idcliente'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO `cliente` (`nombre_client`, `apellido_client`, `cedula`, `tlf_client`)
         VALUES ('$nombre_client', '$apellido_client', '$cedula', '$tlf_client');";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM cliente ORDER BY idcliente DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE `cliente` SET `nombre_client` = '$nombre_client', `apellido_client` = '$apellido_client', `cedula`='$cedula', `tlf_client`='$tlf_client' WHERE `idcliente` = $idcliente";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM cliente WHERE idcliente='$idcliente' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM cliente WHERE idcliente='$idcliente' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM cliente";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;