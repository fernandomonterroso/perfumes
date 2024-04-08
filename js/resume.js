var app = new Vue({
  el: "#app",
  data: {
    perfumes: [],
    visibleItemCount: 5,
    vistaActiva: 2,
  },
  watch: {
    perfumes(val) {
      this.convertTable("tablaPerfumes");
    },
  },
  methods: {
    convertTable(tableId) {
      $("#loading").css("display", "block");
      $(`#${tableId}`).DataTable().destroy();

      this.$nextTick(() => {
        var table = $(`#${tableId}`).DataTable({
          columns: [
            { title: "#", visible: true },
            { title: "Género", visible: false },
            { title: "Detalles del Perfume", visible: true },
            { title: "Imagen", visible: true },
            { title: "Información Adicional", visible: true },
            { title: "Marca", visible: false },
            // Más columnas según sea necesario
          ],
          dom:
            "<'row'<'col-sm-12 col-md-4'l><'col-sm-12 col-md-4'B><'col-sm-12 col-md-4'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
          //"dom": '<"dt-buttons"Bf><"clear">lirtp',
          //buttons: ["copy", "csv", "excel", "pdf", "print", "colvis"],
          responsive: true,
          "pageLength": 5,
          buttons: [
            "copy",
            "csv",
            {
              extend: "excel",
              exportOptions: {
                columns: ":visible",
              },
            },
            {
              extend: "pdf",
              exportOptions: {
                columns: ":visible",
              },
            },
            "colvis",
          ],
          layout: {
            topStart: {
              buttons: ["copy", "csv", "excel", "pdf", "colvis"],
            },
          },
          "initComplete": function() {
            var api = this.api();
            api.columns().every(function() {
                var column = this;
                var header = $(column.header());
                var columnName = header.data('name');

                if (columnName === 'genero' || columnName === 'marca') {
                    var select = $('<select><option value=""></option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function() {
                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
                            column.search(val ? '^' + val + '$' : '', true, false).draw();
                        });

                    column.data().unique().sort().each(function(d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>');
                    });
                }
            });
        }
        });

        // table
        //   .buttons()
        //   .container()
        //   .addClass("btn-group")
        //   .appendTo("#tuTabla_wrapper .col-md-6:eq(0)");

        // Itera sobre cada botón y agrega clases de Bootstrap
        table.buttons().each(function (button) {
          $(button.node).addClass("btn btn-primary");
        });
        $("#loading").css("display", "none");
      });
    },
    showMore() {
      $("#loading").css("display", "block");
      this.visibleItemCount += 5;
      $("#loading").css("display", "none");
    },
    async fetchData() {
      $("#loading").css("display", "block");
      try {
        const response = await fetch("scr/data/perfumes.json");
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }

        this.perfumes = await response.json();
        this.$nextTick(() => {
          $("#loading").css("display", "none");
        });
      } catch (error) {
        this.errorGenerico({
          text: error.message,
        });
      }
    },
    descargarResumen() {
      this.errorGenerico({
        text: "Solicita acceso a programador para acceder a esta funcion.",
      });
    },
    errorGenerico(parametrosEspecificos) {
      const parametrosPorDefecto = {
        title: "Error :(",
        icon: "error",
        confirmButtonText: "Aceptar",
      };

      Swal.fire({
        ...parametrosPorDefecto,
        ...parametrosEspecificos,
      });
    },
  },
  mounted() {
    this.fetchData();
  },
});
