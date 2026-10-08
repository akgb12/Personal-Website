"""Prepare a private résumé copy; never write it to the site's public folder.

Requires PyMuPDF. This is true PDF redaction, not an opaque visual overlay.
Only the contact line, corrected education metadata, and corrected Kung Fu
Express service naming are changed. All other source material is retained.
"""
from pathlib import Path
import json
import re
import pymupdf as pdf

root = Path(__file__).resolve().parent.parent
source = root / "_onboarding/assets/Aney_Kanji_Resume.pdf"
destination = root / "private/resume/Aney_Kanji_Resume.pdf"
education = json.loads((root / "_onboarding/data/education.json").read_text())
document = pdf.open(source)
page = document[0]
original_text = page.get_text()
assert "GPA:" in original_text and "Dec 2027" in original_text

# Remove the existing contact row and education details at their verified bounds.
page.add_redact_annot(pdf.Rect(40, 58, 573, 73), fill=(1, 1, 1))
page.add_redact_annot(pdf.Rect(46, 116, 563, 154), fill=(1, 1, 1))
# The owner's corrected stack specifies AWS RDS for Kung Fu Express.
stack_replacements = []
old_stack = "TypeScript, React.js, FastAPI, PostgreSQL, LangChain, AWS S3, Heroku, Render, Docker"
for rectangle in page.search_for(old_stack):
    assert rectangle.y0 > 610
    page.add_redact_annot(rectangle, fill=(1, 1, 1))
    stack_replacements.append((rectangle.x0, 622.67, old_stack.replace("AWS S3", "AWS RDS"), "tiit", 9.5))
for rectangle in page.search_for("AWS S3 storage"):
    if rectangle.y0 > 635:
        page.add_redact_annot(rectangle, fill=(1, 1, 1))
        stack_replacements.append((rectangle.x0, 647.13, "AWS RDS storage", "tiro", 9))
for link in page.get_links():
    if link["from"].y0 < 75:
        page.delete_link(link)
page.apply_redactions(images=0, graphics=0)

# The original italic subset has zero-width spaces when reused for new text.
# Standard Times faces preserve a similar serif style with correct text encoding.
regular = pdf.Font("tiro")
italic = pdf.Font("tiit")
contact_parts = [
    ("US Citizen", None), ("Austin, TX", None),
    ("aneykanji@gmail.com", "mailto:aneykanji@gmail.com"),
    ("LinkedIn", "https://www.linkedin.com/in/aney-kanji/"),
    ("github.com/akgb12", "https://github.com/akgb12"),
    ("aneykanji12.vercel.app", "https://aneykanji12.vercel.app/"),
]
font_size = 9.3
separator = "  |  "
full_contact = separator.join(part[0] for part in contact_parts)
x = (page.rect.width - regular.text_length(full_contact, fontsize=font_size)) / 2
for index, (label, url) in enumerate(contact_parts):
    if index:
        page.insert_text((x, 67.5), separator, fontname="tiro", fontsize=font_size)
        x += regular.text_length(separator, fontsize=font_size)
    width = regular.text_length(label, fontsize=font_size)
    page.insert_text((x, 67.5), label, fontname="tiro", fontsize=font_size)
    if url:
        page.insert_link({"kind": pdf.LINK_URI, "from": pdf.Rect(x, 58, x + width, 72), "uri": url})
    x += width

page.insert_text((235, 112.28), education["honors"], fontname="tiit", fontsize=9.3)
for index, degree in enumerate(education["degrees"]):
    baseline = 125.83 + index * 11.1
    label = degree["degree"]
    dates = f'{degree["start"]} - {degree["end"]}'
    page.insert_text((46.8, baseline), label, fontname="tiit", fontsize=9.96)
    width = italic.text_length(dates, fontsize=9.96)
    page.insert_text((560 - width, baseline), dates, fontname="tiit", fontsize=9.96)
page.insert_text((46.8, 148), "Relevant Coursework: Data Structures, Software Engineering, Computer Architecture, Databases, OOP Design", fontname="tiro", fontsize=9)
page.insert_text((46.8, 158), "Graduate Coursework: Algorithms, Deep Learning, Information Retrieval, Data Mining, Operating Systems", fontname="tiro", fontsize=9)
for x, baseline, text, font, size in stack_replacements:
    page.insert_text((x, baseline), text, fontname=font, fontsize=size)

document.set_metadata({"title": "Aney Kanji - Private Resume", "author": "Aney Kanji"})
temporary = root / "tmp/pdfs/resume-private.pdf"
temporary.parent.mkdir(parents=True, exist_ok=True)
destination.parent.mkdir(parents=True, exist_ok=True)
document.save(temporary, garbage=4, deflate=True, clean=True)
document.close()
with pdf.open(temporary) as result:
    text = result[0].get_text()
    assert "GPA" not in text and not re.search(r"\b\d{3}-\d{3}-\d{4}\b", text)
    assert "Dec 2027" not in text
    assert "May 2027" in text and "Aug 2024" in text
    assert len(result) == 1
    assert len(result[0].get_links()) >= 4
temporary.replace(destination)
print(f"Prepared private résumé: {destination}")
