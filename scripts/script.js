        $(document).ready(function () {
            // Image preview
            $(".tile img").on("click", function () {
                const imgSrc = $(this).attr("src");
                $(".preview-img").attr("src", imgSrc);
                $(".preview-img").css("transform", "translate(-50%, -50%) scale(1)"); // Reset the image's transform property
                $("#image-preview").fadeIn();
            });

            $(".close-preview, .overlay").on("click", function () {
                $("#image-preview").fadeOut();
            });

            // Pressing Esc key to close the image preview
            $(document).on("keydown", function (e) {
                if (e.key === "Escape") {
                    $("#image-preview").fadeOut();
                }
            });

            // Zoom and pan functionality
            let scale = 1;
            const sensitivity = 0.001;
            const maxScale = 10;

            $(".preview-img").on("wheel", function (e) {
                e.preventDefault();

                const prevScale = scale;
                scale += e.originalEvent.deltaY * -sensitivity;
                scale = Math.max(scale, 1);
                scale = Math.min(scale, maxScale);

                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const translateX = parseFloat($(this).css("transform").split(",")[4].trim());
                const translateY = parseFloat($(this).css("transform").split(",")[5].trim());

                const newTranslateX = translateX - (centerX - e.clientX) * (1 - scale / prevScale);
                const newTranslateY = translateY - (centerY - e.clientY) * (1 - scale / prevScale);

                $(this).css("transform", `translate(${newTranslateX}px, ${newTranslateY}px) scale(${scale})`);
            });

            // Pan functionality remains the same as in the previous code snippet
            let isPanning = false;
            let initialX = null;
            let initialY = null;

            $(".preview-img").on("mousedown", function (e) {
                e.preventDefault();
                isPanning = true;
                initialX = e.clientX;
                initialY = e.clientY;
            });

            $(".preview-img").on("mousemove", function (e) {
                if (!isPanning) return;

                e.preventDefault();

                const deltaX = (e.clientX - initialX) / scale;
                const deltaY = (e.clientY - initialY) / scale;

                const translateX = parseFloat($(this).css("transform").split(",")[4].trim());
                const translateY = parseFloat($(this).css("transform").split(",")[5].trim());

                const newTranslateX = translateX + deltaX;
                const newTranslateY = translateY + deltaY;

                $(this).css("transform", `translate(${newTranslateX}px, ${newTranslateY}px) scale(${scale})`);

                initialX = e.clientX;
                initialY = e.clientY;
            });

            $(".preview-img").on("mouseup", function (e) {
                e.preventDefault();
                isPanning = false;
            });

            $(".preview-img").on("mouseleave", function (e) {
                e.preventDefault();
                isPanning = false;
            });

            // Close the preview when clicking outside the image
            $("#image-preview").on("click", function (e) {
                if ($(e.target).is(".preview-img")) return;
                $("#image-preview").fadeOut();
            });
        });




        $(function () {
            var selectedClass = "";
            $(".fil-cat").click(function () {
                // Remove active class from all buttons
                $(".fil-cat").removeClass("active");
                // Add active class to the clicked button
                $(this).addClass("active");
                selectedClass = $(this).attr("data-rel");
                $("#portfolio").fadeTo(100, 0.1);
                $("#portfolio div").not("." + selectedClass).fadeOut().removeClass('scale-anm');
                setTimeout(function () {
                    $("." + selectedClass).fadeIn().addClass('scale-anm');
                    $("#portfolio").fadeTo(300, 1);
                }, 300);
            });
        });
