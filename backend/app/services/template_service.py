# app/services/template_service.py
templates = {
    "how-to-guide": {
        "id": "how-to-guide",
        "name": "How‑To Guide",
        "structure": ["Introduction", "Step 1", "Step 2", "Step 3", "Conclusion"]
    },
    "product-description": {
        "id": "product-description",
        "name": "Product Description",
        "structure": ["Headline", "Features", "Benefits", "Specifications", "CTA"]
    },
}

def get_template_by_id(template_id: str):
    t = templates.get(template_id)
    if not t:
        raise ValueError("Invalid template_id")
    return t

