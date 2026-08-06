<template>
  <div class="container">
    <div class="header">
      <h1>✨ Vue2 Markdown转HTML示例</h1>
      <p>支持脚注功能的实时预览编辑器</p>
    </div>
    
    <div class="content">
      <div class="editor-panel">
        <div class="panel-title">
          <span>📝 Markdown编辑器</span>
        </div>
        <textarea 
          v-model="markdownText" 
          placeholder="在这里输入Markdown内容..."
          @input="updatePreview"
        ></textarea>
      </div>
      
      <div class="preview-panel">
        <div class="panel-title">
          <span>👀 实时预览</span>
        </div>
        <div class="markdown-preview" v-html="renderedHtml"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'

export default {
  name: 'App',
  data() {
    return {
      markdownText: `# Vue2 Markdown转HTML示例

这是一个支持**脚注功能**的Markdown编辑器示例[^1]。

## 主要特性

- ✅ 实时Markdown预览
- ✅ 脚注支持[^2]
- ✅ 代码高亮
- ✅ 表格渲染
- ✅ 响应式设计

## 代码示例

\`\`\`javascript
// 这是一个JavaScript示例
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Vue2"));
\`\`\`

## 表格示例

| 功能 | 状态 | 说明 |
|------|------|------|
| Markdown解析 | ✅ 完成 | 使用marked.js |
| 脚注支持 | ✅ 完成 | 自动编号和链接 |
| 实时预览 | ✅ 完成 | 即时渲染 |

## 脚注示例

这里是一个带有脚注的段落[^3]。脚注可以让我们为内容添加额外的解释和引用。

[^1]: 这是第一个脚注，说明这是一个Vue2示例项目。
[^2]: 第二个脚注，描述脚注功能的具体实现。
[^3]: 第三个脚注，展示脚注的自动编号和链接功能。`,
      renderedHtml: ''
    }
  },
  
  mounted() {
    this.configureMarked()
    this.updatePreview()
  },
  
  methods: {
    configureMarked() {
      marked.setOptions({
        highlight: function(code, lang) {
          // 简单的代码高亮实现
          if (lang && (lang === 'javascript' || lang === 'js')) {
            return code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
                      .replace(/('.*?')/g, '<span class="string">$1</span>')
                      .replace(/\b(function|return|const|let|var)\b/g, '<span class="keyword">$1</span>')
          }
          return code
        },
        breaks: true,
        gfm: true
      })
    },
    
    updatePreview() {
      // 处理脚注
      const processedText = this.processFootnotes(this.markdownText)
      this.renderedHtml = marked(processedText)
    },
    
    processFootnotes(text) {
      // 脚注处理逻辑
      const footnoteRegex = /\[\^(\d+)\]/g
      let footnoteCount = 0
      const footnotes = {}
      
      // 替换脚注引用
      const processedText = text.replace(footnoteRegex, (match, num) => {
        footnoteCount++
        footnotes[footnoteCount] = num
        return '<sup><a href="#fn' + footnoteCount + '" class="footnote-ref">' + footnoteCount + '</a></sup>'
      })
      
      // 添加脚注列表
      let finalText = processedText
      if (footnoteCount > 0) {
        let footnotesSection = '\n\n<div class="footnotes">\n<h3>脚注</h3>\n<ol>'
        
        for (let i = 1; i <= footnoteCount; i++) {
          const originalNum = footnotes[i]
          const footnoteContent = this.extractFootnoteContent(text, originalNum)
          footnotesSection += '<li id="fn' + i + '"><a href="#fnref' + i + '">↑</a> ' + footnoteContent + '</li>'
        }
        
        footnotesSection += '</ol>\n</div>'
        finalText += footnotesSection
      }
      
      return finalText
    },
    
    extractFootnoteContent(text, footnoteNum) {
      const footnoteRegex = new RegExp('\\[\\^' + footnoteNum + '\\]:\\s*(.*?)(?=\\n\\s*\\[\\^|$)', 's')
      const match = text.match(footnoteRegex)
      return match ? match[1].trim() : '脚注内容未找到'
    }
  }
}
</script>

<style scoped>
/* 代码高亮样式 */
.comment {
  color: #6a9955;
}

.string {
  color: #ce9178;
}

.keyword {
  color: #569cd6;
  font-weight: bold;
}
</style>