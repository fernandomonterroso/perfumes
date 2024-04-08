var app = new Vue({
  el: "#app",
  data: {
    perfumes: [],
    visibleItemCount: 5,
    vistaActiva: 2,
  },
  watch: {
    perfumes(val) {},
  },
  methods: {
    contactWhats() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      const formattedMessage =
        `> Sitio de perfumes\n` +
        `¡Hola Fernando! 🌟 Aquí tienes los detalles de mi consulta:\n\n` +
        `*Nombre*: ${name}\n` +
        `*Email*: ${email}\n` +
        `*Teléfono*: ${phone}\n\n` +
        `Mensaje: ${message}\n\n` +
        `\`\`\`Espero tu respuesta. ¡Gracias! 🙏\`\`\``;
        

      const whatsappNumber = "41291570";
      const whatsappLink = `https://wa.me/502${whatsappNumber}?text=${encodeURIComponent(
        formattedMessage
      )}`;

      window.open(whatsappLink, "_blank");
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
  mounted() {},
});
