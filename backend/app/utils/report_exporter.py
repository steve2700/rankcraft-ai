from fpdf import FPDF
import tempfile
import os

def generate_pdf(report):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    pdf.cell(200, 10, txt="SEO Report", ln=1, align='C')
    pdf.multi_cell(0, 10, txt=f"Title: {report['title']}")
    pdf.multi_cell(0, 10, txt=f"Meta Description: {report['meta']}")
    pdf.multi_cell(0, 10, txt=f"Content: {report['content'][:200]}...")
    pdf.multi_cell(0, 10, txt=f"Keyword: {report['keyword']}")
    pdf.cell(0, 10, txt=f"SEO Score: {report['seo_score']}", ln=1)
    pdf.cell(0, 10, txt=f"Title Score: {report['title_score']}", ln=1)
    pdf.cell(0, 10, txt=f"Meta Score: {report['meta_score']}", ln=1)

    temp_path = tempfile.mktemp(suffix=".pdf")
    pdf.output(temp_path)
    return temp_path

def generate_html(report):
    html = f"""
    <html>
      <head><title>SEO Report</title></head>
      <body>
        <h1>SEO Report</h1>
        <p><strong>Title:</strong> {report['title']}</p>
        <p><strong>Meta:</strong> {report['meta']}</p>
        <p><strong>Content:</strong> {report['content'][:200]}...</p>
        <p><strong>Keyword:</strong> {report['keyword']}</p>
        <p><strong>SEO Score:</strong> {report['seo_score']}</p>
        <p><strong>Title Score:</strong> {report['title_score']}</p>
        <p><strong>Meta Score:</strong> {report['meta_score']}</p>
      </body>
    </html>
    """

    temp_path = tempfile.mktemp(suffix=".html")
    with open(temp_path, "w") as f:
        f.write(html)
    return temp_path

