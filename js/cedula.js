<div class="form-group">
  <label for="cedula" class="col-form-label">Cédula:</label>
  <input type="tel" class="form-control" id="cedula" required>
</div>

<script>
const cedulaInput = document.getElementById('cedula');

cedulaInput.addEventListener('input', function() {
  const value = this.value;
  if (value.length > 2 && !value.startsWith('V-') && !value.startsWith('J-')) {
    if (value.startsWith('0')) {
      this.value = 'V-' + value.substring(1);
    } else {
      this.value = 'J-' + value;
    }
  }
});
</script>
