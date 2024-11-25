let isTyping = false; // Trạng thái gõ chữ
let hasFinishedTyping = false; // Trạng thái khi gõ chữ hoàn tất
let interval; // Biến lưu ID của setInterval

function activateSnowAndTree() {
    const tree = document.querySelector(".tree");
    const snowContainer = document.querySelector(".snow-ball-container");

    // Hiển thị cây thông
    if (tree) {
        tree.style.display = "block"; // Đảm bảo cây thông hiển thị
    }

    // Hiển thị tuyết
    if (snowContainer) {
        snowContainer.style.display = "block"; // Đảm bảo toàn bộ tuyết hiển thị
    }
}

function hideHeartAndShowPart2() {
    group.visible = false; // Ẩn trái tim

    const part2 = document.getElementById("part2");
    const textContent = part2.querySelector(".text-content");

    if (!part2 || !textContent) {
        console.error("Không tìm thấy #part2 hoặc .text-content!");
        return;
    }

    // Lấy nội dung văn bản gốc và thay thế xuống dòng bằng <br>
    const originalText = textContent.textContent.trim();
    const formattedText = originalText.replace(/\n/g, "<br>");

    if (isTyping) return; // Nếu đang gõ, bỏ qua click

    textContent.innerHTML = ""; // Reset nội dung
    part2.style.display = "block"; // Hiển thị #part2
    activateSnowAndTree(); // Hiển thị cây thông và tuyết

    let index = 0;
    isTyping = true;

    // Hiển thị từng ký tự với hiệu ứng gõ chữ
    interval = setInterval(() => {
        if (index < formattedText.length) {
            const currentChar = formattedText[index];

            // Kiểm tra nếu ký tự hiện tại là một phần tử HTML (<br>)
            if (currentChar === "<") {
                const endTagIndex = formattedText.indexOf(">", index);
                const htmlTag = formattedText.slice(index, endTagIndex + 1);
                textContent.innerHTML += htmlTag;
                index = endTagIndex; // Nhảy qua toàn bộ thẻ HTML
            } else {
                textContent.innerHTML += currentChar; // Thêm ký tự thông thường
            }

            index++;
        } else {
            clearInterval(interval); // Dừng hiệu ứng khi hoàn tất
            isTyping = false; // Đặt trạng thái không gõ chữ
        }
    }, 20);
}

function createSnow() {
    const snowContainer = document.querySelector(".snow-ball-container");
    if (!snowContainer) return;

    for (let i = 0; i < 200; i++) { // Tăng số lượng tuyết lên 200
        const snowBall = document.createElement("div");
        snowBall.classList.add("snow-ball");
        snowBall.style.left = `${Math.random() * 100}vw`; // Vị trí ngẫu nhiên ngang
        snowBall.style.top = `${Math.random() * -100}vh`; // Bắt đầu rơi từ phía trên màn hình
        snowBall.style.animationDelay = `${Math.random() * 5}s`; // Trễ ngẫu nhiên
        snowBall.style.animationDuration = `${10 + Math.random() * 5}s`; // Thời gian rơi ngẫu nhiên
        snowBall.style.width = `${5 + Math.random() * 15}px`; // Kích thước ngẫu nhiên
        snowBall.style.height = snowBall.style.width;
        snowContainer.appendChild(snowBall);
    }
}


// Gọi hàm tạo tuyết khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", createSnow);

