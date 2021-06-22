<template>
  <div>
    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 footer-copyright">
            <p class="mb-0">-----</p>
          </div>
          <div class="col-md-6">
            <p class="pull-right mb-0">Realizado por Gonzalo Salinas Herrera<em class="fa fa-desktop"></em></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import json from '../data/menu'
export default {
  name: 'footerpage',
  data(){
    return{
      customizer :false,
      data:"data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json)),
    }
  }
}
</script>
