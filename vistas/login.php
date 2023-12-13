<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="../img/4.png">
    <link rel="stylesheet" href="../css/login.css">
    <title>login</title>
</head>
<body>
    <div id="particles-js"></div>
        <div class="formulario">
            <img src="../img/login2.png" alt="logo">
            
            <h1>Inicio de sesión</h1>
            <hr>
              <?php 
                if (isset($_GET['error'])) {
            ?>
                <p class="error">
                <?php
                echo $_GET['error']
                ?>
                
                </p>
            <?php    
                }
            ?>
            <hr>
            <form action="../bd/iniciarsesion.php" method="post">

            <label>Nombre de usuario</label>
            <div class="username">
                <input type="text" name="usuario" required>
                
            </div>
            <label>Contraseña</label>
            <div class="username">
                <input type="password" name="clave">
                
            </div>
            <input type="submit" value="Iniciar">

                


            </form>
        </div>
        
        <?php require_once "footer.php"  ?>

<script src="../js/particles.min.js"></script>
<script src="../js/loginfondo.js"></script>
</body>
</html>