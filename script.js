let selectedSize = 5;
let selectedShape = "DrawLine";
let showingAllShapes = false;

const allShapes = [
    { value: "DrawLine", display: "Line" },
    { value: "DrawStripedLine", display: "Striped Line" },
    { value: "DrawSquare", display: "Square" },
    { value: "DrawParallelogram", display: "Parallelogram" },
    { value: "DrawTriangle", display: "Triangle" },
    { value: "DrawReverseTriangle", display: "ReverseTriangle" },
    { value: "DrawIsoscelesTriangle", display: "Isosceles Triangle" },
    { value: "DrawReverseIsoscelesTriangle", display: "Reverse Isosceles" },
    { value: "DrawHourGlass", display: "HourGlass" },
    { value: "DrawDiamond", display: "Diamond" },
    { value: "DrawZero", display: "Zero" },
    { value: "DrawArrowUp", display: "Arrow Up" },
    { value: "DrawArrowDown", display: "Arrow Down" },
    { value: "DrawX", display: "X" },
    { value: "DrawBowTie", display: "BowTie" }
];

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(`.size-button[data-size="5"]`).classList.add("selected");
    document.querySelector(`.shape-button[data-shape="DrawLine"]`).classList.add("selected");
    
    drawShape();
    
    document.getElementById("moreShapesBtn").addEventListener("click", toggleAllShapes);
    
    document.getElementById("sizeContainer").addEventListener("click", function(e) {
        if (e.target.classList.contains("size-button")) {
            document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("selected"));
            e.target.classList.add("selected");
            selectedSize = parseInt(e.target.getAttribute("data-size"));
            drawShape();
        }
    });
    
    document.getElementById("shapeContainer").addEventListener("click", function(e) {
        if (e.target.classList.contains("shape-button")) {
            document.querySelectorAll(".shape-button").forEach(btn => btn.classList.remove("selected"));
            e.target.classList.add("selected");
            selectedShape = e.target.getAttribute("data-shape");
            drawShape();
        }
    });
});

function toggleAllShapes() {
    const shapeContainer = document.getElementById("shapeContainer");
    const moreShapesBtn = document.getElementById("moreShapesBtn");
    let html = '';
    
    if (showingAllShapes) {
        allShapes.slice(0, 5).forEach(shape => {
            html += `<button class="shape-button" data-shape="${shape.value}">${shape.display}</button>`;
        });
        moreShapesBtn.textContent = "More Shapes";
    } else {
        allShapes.forEach(shape => {
            html += `<button class="shape-button" data-shape="${shape.value}">${shape.display}</button>`;
        });
        moreShapesBtn.textContent = "Less Shapes";
    }
    
    shapeContainer.innerHTML = html;
    const selectedButton = document.querySelector(`.shape-button[data-shape="${selectedShape}"]`);
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
    showingAllShapes = !showingAllShapes;
}

function drawShape() {
    const size = selectedSize;
    const shape = selectedShape;
    let output = "";
    
    const shapeFunctions = {
        DrawLine: (size) => "*".repeat(size),
        DrawStripedLine: (size) => {
            let result = "";
            for (let i = 0; i < size; i++) {
                result += i % 2 === 0 ? "* " : "_ ";
            }
            return result;
        },
        DrawSquare: (size) => {
            let result = "";
            for (let i = 0; i < size; i++) {
                result += "*".repeat(size) + "\n";
            }
            return result;
        },
        DrawParallelogram: (size) => {
            let result = "";
            for (let i = 0; i < size; i++) {
                result += " ".repeat(size - i - 1) + "*".repeat(size) + "\n";
            }
            return result;
        },
        DrawTriangle: (size) => {
            let result = "";
            for (let i = 1; i <= size; i++) {
                result += "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawReverseTriangle: (size) => {
            let result = "";
            for (let i = size; i > 0; i--) {
                result += "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawIsoscelesTriangle: (size) => {
            let result = "";
            for (let i = 1; i <= size; i += 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawReverseIsoscelesTriangle: (size) => {
            let result = "";
            for (let i = size; i > 0; i -= 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawHourGlass: (size) => {
            let result = "";
            for (let i = size; i > 0; i -= 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            for (let i = 3; i <= size; i += 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawDiamond: (size) => {
            let result = "";
            for (let i = 1; i <= size; i += 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            for (let i = size - 2; i > 0; i -= 2) {
                result += " ".repeat((size - i) / 2) + "*".repeat(i) + "\n";
            }
            return result;
        },
        DrawZero: (size) => {
            let result = "*".repeat(size) + "\n";
            for (let i = 0; i < size - 2; i++) {
                result += "*" + " ".repeat(size - 2) + "*\n";
            }
            result += "*".repeat(size);
            return result;
        },
        DrawArrowUp: (size) => {
            const arrowHeadHeight = Math.ceil(size / 2);
            const stemHeight = size - arrowHeadHeight;
            const stemWidth = Math.max(1, Math.floor(size / 3));
            const stemPadding = Math.floor((size - stemWidth) / 2);
            let result = "";
            for (let i = 0; i < arrowHeadHeight; i++) {
                const stars = 2 * i + 1;
                const padding = Math.floor((size - stars) / 2);
                result += " ".repeat(padding) + "*".repeat(stars) + "\n";
            }
            const stemLine = " ".repeat(stemPadding) + "*".repeat(stemWidth) + "\n";
            result += stemLine.repeat(stemHeight);
            return result;
        },
        DrawArrowDown: (size) => {
            const arrowHeadHeight = Math.ceil(size / 2);
            const stemHeight = size - arrowHeadHeight;
            const stemWidth = Math.max(1, Math.floor(size / 3));
            const stemPadding = Math.floor((size - stemWidth) / 2);
            let result = "";
            const stemLine = " ".repeat(stemPadding) + "*".repeat(stemWidth) + "\n";
            result += stemLine.repeat(stemHeight);
            for (let i = arrowHeadHeight - 1; i >= 0; i--) {
                const stars = 2 * i + 1;
                const padding = Math.floor((size - stars) / 2);
                result += " ".repeat(padding) + "*".repeat(stars) + "\n";
            }
            return result;
        },
        DrawX: (size) => {
            let result = "";
            for (let i = 0; i < size; i++) {
                let line = "";
                for (let j = 0; j < size; j++) {
                    if (j === i || j === (size - 1 - i)) {
                        line += "*";
                    } else {
                        line += " ";
                    }
                }
                result += line + "\n";
            }
            return result;
        },
        DrawBowTie: (size) => {
            let result = "";
            for (let i = 0; i < Math.floor(size / 2); i++) {
                result += "*".repeat(i + 1) + " ".repeat(size - 2 * (i + 1)) + "*".repeat(i + 1) + "\n";
            }
            if (size % 2 !== 0) {
                result += "*".repeat(size) + "\n";
            }
            for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
                result += "*".repeat(i + 1) + " ".repeat(size - 2 * (i + 1)) + "*".repeat(i + 1) + "\n";
            }
            return result;
        }
    };

    if (shapeFunctions[shape]) {
        output = shapeFunctions[shape](size);
    }
    document.getElementById("output").textContent = output;
}