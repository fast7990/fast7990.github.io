const { PDFDocument } = require("pdf-lib");
const fs = require("fs/promises"); // 使用Promise API

async function writePDFMetadata(inputPath, outputPath, metadata) {
  try {
    // 读取现有PDF文件
    const pdfBytes = await fs.readFile(inputPath);

    // 加载PDF文档
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // 设置标准元数据（Title, Author等）
    if (metadata.title) pdfDoc.setTitle(metadata.title);
    if (metadata.author) pdfDoc.setAuthor(metadata.author);
    if (metadata.subject) pdfDoc.setSubject(metadata.subject);
    if (metadata.keywords)
      pdfDoc.setKeywords([JSON.stringify({ us: 1, bd: 2 })]);
    if (metadata.creator) pdfDoc.setCreator(metadata.creator);
    if (metadata.producer) pdfDoc.setProducer(metadata.producer);

    // 设置自定义元数据
    // 注意：pdf-lib 1.17.1版本中没有直接支持自定义元数据的方法
    // 以下是一种变通方案，将自定义数据序列化为JSON并存储在subject字段中
    if (metadata.custom) {
      const customData = JSON.stringify(metadata.custom);
      if (metadata.subject) {
        pdfDoc.setSubject(`${metadata.subject} [Custom: ${customData}]`);
      } else {
        pdfDoc.setSubject(`Custom: ${customData}`);
      }
    }

    // 保存修改后的PDF
    const modifiedPdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, modifiedPdfBytes);
    console.log("PDF 元数据写入成功！");
  } catch (error) {
    console.error(" 写入失败：", error);
  }
}

// 使用示例
writePDFMetadata(
  "input.pdf", // 源PDF路径
  "output.pdf", // 输出PDF路径
  {
    title: "我的PDF文档",
    author: "张三",
    keywords: ["PDF", "元数据", "示例"],
    custom: {
      projectId: "PROJ-2023-001",
      version: "1.0.0",
      department: "技术部",
    },
  }
);
