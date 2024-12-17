const backgroundUrls = [
    "https://static.remove.bg/backgrounds/product/art-artistic-background-1279813-size-156.jpg",
    "https://static.remove.bg/backgrounds/person/Nature/background-clouds-colors-726330-size-156.jpg",
    "https://static.remove.bg/backgrounds/product/antique-backdrop-background-164005-size-156.jpg",
    "https://static.remove.bg/backgrounds/car/new/bg3-size-156.png",
    "https://static.remove.bg/backgrounds/realestate/background-3104413_1920-size-156.jpg",
    "https://static.remove.bg/backgrounds/person/Autumn/dawn-desktop-wallpaper-environment-2055389-size-156.jpg",
    "https://static.remove.bg/backgrounds/person/Urban/architecture-building-business-2339009-size-156.jpg",
    "https://static.remove.bg/backgrounds/person/new/pride_gradient-size-156.png",
    "https://static.remove.bg/backgrounds/realestate/pexels-pixabay-531756-size-156.jpg",
    "https://static.remove.bg/backgrounds/person/new/pexels-zaksheuskaya-1561020-size-156.jpg",
    "https://i.pinimg.com/736x/d0/09/52/d00952ba351f7b7f0905a4a9465b6fc8.jpg",
    "https://i.pinimg.com/736x/33/92/a6/3392a60bb7a4c4ec72f8bef181a9f556.jpg"
];

const imageContainer = document.querySelector('.image-container');
console.log(imageContainer);

const previewImage = document.getElementById('previewImage');
const fileInput = document.getElementById('fileInput');
const widthInd = document.getElementById('width');
const heightInd = document.getElementById('height');


let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
            previewImage.style.transform = 'translate(0px, 0px) scale(1)';
        };
        reader.readAsDataURL(file);
        document.getElementById('downloadBtn').style.display = "block";
    }
});

document.querySelectorAll('.shape-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.shape-btn').forEach(button => button.classList.remove('active'));
        this.classList.add('active');
        const shape = this.dataset.shape;
        const imageContainer = document.querySelector('.image-container');

        imageContainer.classList.remove('circle-shape', 'square-shape', 'oval-shape', 'rect-shape', 'potrait-shape', 'custom-shape', 'custom2-shape', 'custom3-shape', 'custom4-shape');

        if (shape) {
            imageContainer.classList.add(`${shape}-shape`)
        }

    });
});

document.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        imageContainer.style.border = `${this.style.border}`;
    });
});

imageContainer.addEventListener('dblclick', dragStart);
imageContainer.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    if (!isDragging) {
        isDragging = true;

        if (e.type === 'touchstart') {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        updateImagePosition();
    }
}

function dragEnd() {
    if (isDragging) {
        isDragging = false;
    }
}

function updateImagePosition() {
    previewImage.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
}

const zoomRange = document.getElementById('zoomRange');
let scale = 1;

zoomRange.addEventListener('input', function () {
    scale = parseFloat(zoomRange.value);
    updateImagePosition();
});


const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    document.querySelectorAll('.resize-handle, .rotate-handle').forEach(handle => {
        handle.style.display = 'none';
    });
    html2canvas(imageContainer, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'customized-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});

document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.size-btn').forEach(button => button.classList.remove('active'));
        this.classList.add('active');

        const ratio = this.dataset.ratio.split('/');
        const aspectWidth = ratio[0];
        const aspectHeight = ratio[1];

        let width = 500;
        let height = (450 * aspectHeight) / aspectWidth;

        const widthInd = document.getElementById('width');
        const heightInd = document.getElementById('height');

        console.log(ratio);

        console.log(aspectWidth, aspectHeight);

        if (aspectWidth === "default" && aspectHeight === "default") {
            imageContainer.style.width = '';
            imageContainer.style.height = '';
            widthInd.innerText = `Width 12 inch (30.48 cm)`;
            heightInd.innerText = `Height 9 inch (22.86 cm)`;
        }
        else {
            imageContainer.style.width = `${Math.round(width)}px`;
            imageContainer.style.height = `${Math.round(height)}px`;
            widthInd.innerText = `Width ${aspectWidth} inch (${aspectWidth * 2.54} cm)`;
            heightInd.innerText = `Height ${aspectHeight} inch (${aspectHeight * 2.54} cm)`;
        }
        document.querySelectorAll('.circle-shape', '.square-shape', '.oval-shape', '.rect-shape', '.potrait-shape', '.custom-shape', '.custom2-shape', '.custom3-shape', '.custom4-shape').forEach(shape => {
            if (shape.classList.contains('circle-shape')) {
                console.log("square-shape");

                shape.style.width = `${Math.round(height)}px`;
                shape.style.height = `${Math.round(height)}px`;
            } else if (shape.classList.contains('square-shape')) {
                console.log("square-shape");

                shape.style.width = `${Math.round(width)}px`;
                shape.style.height = `${Math.round(width)}px`;
            } else if (shape.classList.contains('rect-shape')) {
                shape.style.width = `${Math.round(width)}px`;
                shape.style.height = `${Math.round(width) - 100}px`;
            } else {
                shape.style.width = `${Math.round(width)}px`;
                shape.style.height = `${Math.round(height)}px`;
            }
        });

        if ((aspectWidth == 11 && aspectHeight == 11) || (aspectWidth == 16 && aspectHeight == 16)) {
            document.querySelectorAll('.shape-btn').forEach(button => {
                if (button.classList.contains('oval') || button.classList.contains('potrait')) {
                    button.style.display = 'none';
                } else {
                    button.style.display = 'inline-block';
                }
            });
        }
        else if (aspectWidth === "default" && aspectHeight === "default") {
            document.querySelectorAll('.shape-btn').forEach(button => {
                button.style.display = 'inline-block';
            });
        }
        else {
            document.querySelectorAll('.shape-btn').forEach(button => {
                if (button.classList.contains('potrait') || button.classList.contains('rect') || button.classList.contains('circle') || button.classList.contains('custom3') || button.classList.contains('custom4') || button.classList.contains('custom5')) {
                    button.style.display = 'none';
                }
                else {
                    button.style.display = 'inline-block';
                }
            });
        }
    });
});


const removeBgBtn = document.getElementById('removeBgBtn');
removeBgBtn.addEventListener('click', openBgModal);

function openBgModal() {
    const bgGallery = document.getElementById('bgGallery');
    bgGallery.innerHTML = '';

    backgroundUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Background Image';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => selectBackground(url));
        bgGallery.appendChild(img);
    });

    document.getElementById('bgModal').style.display = 'block';
}

function closeBgModal() {
    document.getElementById('bgModal').style.display = 'none';
}

function selectBackground(selectedBgUrl) {
    const previewImage = document.getElementById('previewImage');

    changeBackgroundAPI(selectedBgUrl, previewImage.src);
    closeBgModal();
}

async function changeBackgroundAPI(backgroundUrl, originalImageUrl) {
    const imageBlob = await fetch(originalImageUrl)
        .then(res => res.blob())
        .catch(error => {
            console.error('Error fetching image blob:', error);
            return null;
        });

    if (!imageBlob) {
        alert('Failed to fetch image blob');
        return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        try {
            const response = await fetch('/change-bg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    imageBlob: base64String,
                    backgroundUrl: backgroundUrl
                })
            });

            const data = await response.json();

            if (data.success) {
                const bufferData = new Uint8Array(data.rbgResultData.data);
                const imageUrl = URL.createObjectURL(new Blob([bufferData], { type: 'image/png' }));
                previewImage.src = imageUrl;
            } else {
                console.error('Failed to remove background:', data.error);
                alert('Failed to remove background');
            }
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Failed to remove background');
        }
    };
    reader.readAsDataURL(imageBlob);
}


document.getElementById('addTextBtn').addEventListener('click', function () {
    document.getElementById('textModal').style.display = 'block';
});

function closeTextModal() {
    document.getElementById('textModal').style.display = 'none';
}

// document.getElementById('addTextModalBtn').addEventListener('click', function () {
//     const text = document.getElementById('modalTextInput').value;
//     const textColor = document.getElementById('textColor').value;
//     const fontStyle = document.getElementById('fontStyleSelect').value;

//     if (text.trim() !== '') {
//         const textBox = document.createElement('div');
//         textBox.id = 'textBox';
//         textBox.innerText = text;
//         textBox.style.position = 'absolute';
//         textBox.style.fontFamily = fontStyle;
//         textBox.style.color = textColor;
//         textBox.style.fontSize = '24px';
//         textBox.style.top = '50%';
//         textBox.style.left = '50%';
//         textBox.style.transform = 'translate(-50%, -50%)';
//         textBox.style.cursor = "move";
//         document.getElementById('imageContainer').appendChild(textBox);
//         textBox.style.display = 'block';
//         makeDraggable(textBox);
//     }

//     closeTextModal();
// });

// function makeDraggable(element) {
//     let isDragging = false;
//     let offsetX, offsetY;

//     element.addEventListener('mousedown', function (e) {
//         isDragging = true;
//         offsetX = e.clientX - element.offsetLeft;
//         offsetY = e.clientY - element.offsetTop;
//     });

//     document.addEventListener('mousemove', function (e) {
//         if (isDragging) {
//             element.style.left = e.clientX - offsetX + 'px';
//             element.style.top = e.clientY - offsetY + 'px';
//         }
//     });

//     document.addEventListener('mouseup', function () {
//         isDragging = false;
//     });
// }

document.getElementById('addTextModalBtn').addEventListener('click', function () {
    const text = document.getElementById('modalTextInput').value;
    const textColor = document.getElementById('textColor').value;
    const fontStyle = document.getElementById('fontStyleSelect').value;

    if (text.trim() !== '') {
        const textBox = document.createElement('div');
        textBox.className = 'text-box';
        textBox.innerText = text;

        textBox.style.position = 'absolute';
        textBox.style.fontFamily = fontStyle;
        textBox.style.color = textColor;
        textBox.style.fontSize = '24px';
        textBox.style.top = '50%';
        textBox.style.left = '50%';
        textBox.style.transform = 'translate(-50%, -50%)';
        textBox.style.cursor = 'move';
        textBox.style.border = 'none';
        document.getElementById('imageContainer').appendChild(textBox);

        makeDraggable(textBox);
        makeResizable(textBox);
        makeRotatable(textBox);
    }

    closeTextModal();
});

function makeDraggable(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', function (e) {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        element.style.cursor = 'grabbing';

        element.style.border = '2px dashed #248EE6';
        element.querySelector('.resize-handle').style.display = 'block';
        element.querySelector('.rotate-handle').style.display = 'block';
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            element.style.left = e.clientX - offsetX + 'px';
            element.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        isDragging = false;
        element.style.cursor = 'move';
    });

    document.addEventListener('mousedown', function (e) {
        if (!element.contains(e.target)) {
            element.style.border = 'none';
            element.querySelector('.resize-handle').style.display = 'none';
            element.querySelector('.rotate-handle').style.display = 'none';
        }
    });
}

function makeResizable(element) {
    const resizeHandle = document.createElement('div');
    resizeHandle.className = 'resize-handle';
    resizeHandle.style.position = 'absolute';
    resizeHandle.style.right = '-11.3px';
    resizeHandle.style.bottom = '-6.5px';
    resizeHandle.style.fontSize = '24px';
    resizeHandle.style.cursor = 'crosshair';
    resizeHandle.innerText = '+';
    resizeHandle.style.display = 'none';

    element.appendChild(resizeHandle);

    resizeHandle.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        const initialWidth = element.offsetWidth;
        const initialMouseX = e.clientX;

        function resize(e) {
            const newSize = initialWidth + (e.clientX - initialMouseX);
            element.style.fontSize = newSize + 'px';
        }
        function stopResizing() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResizing);
        }

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResizing);
    });
}

function makeRotatable(element) {
    const rotateHandle = document.createElement('div');
    rotateHandle.className = 'rotate-handle';
    rotateHandle.style.position = 'absolute';
    rotateHandle.style.top = '-30px';
    rotateHandle.style.left = '50%';
    rotateHandle.style.transform = 'translateX(-50%)';
    rotateHandle.style.cursor = 'pointer';
    rotateHandle.style.fontSize = '24px';
    rotateHandle.innerHTML = '&#8635;';
    rotateHandle.style.display = 'none';

    element.appendChild(rotateHandle);

    rotateHandle.addEventListener('mousedown', function (e) {
        e.stopPropagation();
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        function rotate(e) {
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const degree = (angle * (180 / Math.PI) + 90) % 360;
            element.style.transform = `translate(-50%, -50%) rotate(${degree}deg)`;
        }

        function stopRotating() {
            document.removeEventListener('mousemove', rotate);
            document.removeEventListener('mouseup', stopRotating);
        }

        document.addEventListener('mousemove', rotate);
        document.addEventListener('mouseup', stopRotating);
    });
}

// JavaScript to update clock hands and numbers

function updateClock() {
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update hands
    const hourDeg = (hours % 12) * 30 + (minutes / 2); // Each hour is 30 degrees + minute influence
    const minuteDeg = minutes * 6; // Each minute is 6 degrees
    const secondDeg = seconds * 6; // Each second is 6 degrees

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;
}

// Function to create clock numbers
function createClockNumbers() {
    const clockFace = document.querySelector('.clock-face');
    for (let i = 1; i <= 12; i++) {
        const clockNumber = document.createElement('div');
        clockNumber.classList.add('clock-number');
        clockNumber.textContent = i;

        // Calculate the angle and position of each number
        const angle = (i - 3) * 30; // 3 o'clock position is the starting point (0 degrees)
        const radius = 40; // Distance from the center
        const x = 50 + radius * Math.cos(angle * Math.PI / 180);
        const y = 50 + radius * Math.sin(angle * Math.PI / 180);

        clockNumber.style.left = `${x}%`;
        clockNumber.style.top = `${y}%`;

        clockFace.appendChild(clockNumber);
    }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initialize clock on page load
updateClock();

// Create the clock numbers on page load
createClockNumbers();


