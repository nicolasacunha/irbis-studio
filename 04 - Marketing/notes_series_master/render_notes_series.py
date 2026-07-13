"""
Renderiza os 108 HTMLs das 3 séries como PNG 1080x1350.
"""

from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = Path("/home/claude/irbis/notes_series")
W, H = 1080, 1350

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(
        viewport={"width": W, "height": H},
        device_scale_factor=2,
    )
    page = context.new_page()

    for series_dir in sorted(BASE.iterdir()):
        if not series_dir.is_dir():
            continue
        count = 0
        for carousel_dir in sorted(series_dir.iterdir()):
            if not carousel_dir.is_dir():
                continue
            html_dir = carousel_dir / "html"
            png_dir = carousel_dir / "png"
            png_dir.mkdir(parents=True, exist_ok=True)
            for html_path in sorted(html_dir.glob("*.html")):
                page.goto(f"file://{html_path}")
                page.evaluate("document.fonts.ready")
                page.wait_for_timeout(150)
                out = png_dir / (html_path.stem + ".png")
                page.screenshot(path=str(out), full_page=False, omit_background=False)
                count += 1
        print(f"✓ {series_dir.name}: {count} PNGs")

    browser.close()
