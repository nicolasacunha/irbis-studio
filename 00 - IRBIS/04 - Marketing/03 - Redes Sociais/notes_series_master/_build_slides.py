"""
IRBIS Manifesto Carousel — Gerador de slides
Gera 9 slides como HTML (pra render PNG via playwright) e SVG (pra Figma)
Fidelidade total ao brand system: Abyss + Signal + Sora
"""

from pathlib import Path
import json

# ============================================================================
# BRAND SYSTEM — fonte de verdade
# ============================================================================
BRAND = {
    "abyss":  "#0C0C0E",
    "onyx":   "#18181B",
    "slate":  "#27272A",
    "signal": "#FF3D00",
    "deep":   "#E63900",
    "light":  "#FAFAFA",
    "muted":  "#71717A",
    "dim":    "#52525B",
}

# Dimensões pro export final (resolução exata do carrossel IG)
W, H = 1080, 1350

# ============================================================================
# CONTEÚDO DOS 9 SLIDES
# ============================================================================
SLIDES = [
    {
        "num": 1,
        "name": "01_cover",
        "type": "cover",
        "tag_top": "Manifesto — 01",
        "tag_color": BRAND["muted"],
        "headline": "Design is dead.",
        "subhead": "We build experiences.",
        "body": None,
        "tag_left": "@byirbis",
        "tag_right": "↳ swipe",
    },
    {
        "num": 2,
        "name": "02_contexto",
        "type": "diagnostic",
        "tag_top": "01 / O contexto",
        "tag_color": BRAND["muted"],
        "headline": "Site bonito\nnão basta mais.",
        "subhead": None,
        "body": "O mercado encheu de bonito. Template, Framer-by-the-numbers, clone do clone. O cliente passa direto. O concorrente também.",
        "tag_left": "@byirbis",
        "tag_right": "02 / 09",
    },
    {
        "num": 3,
        "name": "03_anti_agency",
        "type": "diagnostic",
        "tag_top": "02 / Anti-agency",
        "tag_color": BRAND["signal"],
        "headline": "Agência morreu\nprimeiro.",
        "subhead": None,
        "body": "Cobra fortuna. Leva 3 meses. Entrega genérico. O designer sonha, o dev estraga, o gerente vira intermediário. Você aceita porque cansou.",
        "tag_left": "@byirbis",
        "tag_right": "03 / 09",
    },
    {
        "num": 4,
        "name": "04_anti_template",
        "type": "diagnostic",
        "tag_top": "03 / Anti-template",
        "tag_color": BRAND["signal"],
        "headline": "Templates dressed\nas branding.",
        "subhead": None,
        "body": "WordPress. Wix. Squarespace. Framer com pluginzão. Tudo igual. Seu concorrente direto roda no mesmo template. Diferenciação: zero.",
        "tag_left": "@byirbis",
        "tag_right": "04 / 09",
    },
    {
        "num": 5,
        "name": "05_anti_slow",
        "type": "diagnostic",
        "tag_top": "04 / Anti-slow",
        "tag_color": BRAND["signal"],
        "headline": "3 meses já é\ntarde demais.",
        "subhead": None,
        "body": "Quem lança primeiro define a categoria. IA tornou velocidade requisito, não vantagem. 2 semanas é o novo padrão.",
        "tag_left": "@byirbis",
        "tag_right": "05 / 09",
    },
    {
        "num": 6,
        "name": "06_shift",
        "type": "diagnostic",
        "tag_top": "05 / O que mudou",
        "tag_color": BRAND["signal"],
        "headline": "Site virou\nexperience.",
        "subhead": None,
        "body": "3D, motion, código real, interação. O tipo de produto digital que faz o usuário parar de scrollar — e o seu concorrente perguntar quem fez.",
        "tag_left": "@byirbis",
        "tag_right": "06 / 09",
    },
    {
        "num": 7,
        "name": "07_references",
        "type": "references",
        "tag_top": "06 / New benchmark",
        "tag_color": BRAND["signal"],
        "headline_lines": ["Locomotive.", "NEXUM.", "Thingy & Thingy."],
        "body": "Não é vanguarda. É o novo padrão internacional. Quem entende isso primeiro vence cinco ciclos de mercado.",
        "tag_left": "@byirbis",
        "tag_right": "07 / 09",
    },
    {
        "num": 8,
        "name": "08_thesis",
        "type": "thesis",
        "tag_top": "07 / Nossa posição",
        "tag_color": BRAND["signal"],
        "headline_a": "Design is dead.",
        "headline_b": "We build experiences.",
        "body": "Design + code, uma cabeça. IA como multiplicador. 2 semanas, não 3 meses.",
        "tag_left": "@byirbis",
        "tag_right": "08 / 09",
    },
    {
        "num": 9,
        "name": "09_cta",
        "type": "cta",
        "tag_top": "Start your project",
        "tag_color": BRAND["muted"],
        "wordmark": "IRBIS",
        "subline": "We build experiences.",
        "body": "Immersive web design. Custom digital products. Brand DNA.",
        "cta_text": "irbis.studio",
        "tag_left": "@byirbis",
        "tag_right": "09 / 09",
    },
]


# ============================================================================
# HTML GENERATOR — pro render PNG via playwright
# ============================================================================

HTML_BASE = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
@font-face {{
  font-family: 'Sora';
  src: url('../fonts/Sora-VF.ttf') format('truetype-variations');
  font-weight: 100 800;
}}
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
html, body {{
  width: {W}px; height: {H}px;
  background: {abyss};
  font-family: 'Sora', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  overflow: hidden;
}}
.slide {{
  width: {W}px; height: {H}px;
  background: {abyss};
  color: {light};
  position: relative;
  padding: 72px;
}}
.tag-top {{
  position: absolute;
  top: 72px; left: 72px;
  font-size: 19px;
  font-weight: 300;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}}
.tag-bottom {{
  position: absolute;
  bottom: 72px; left: 72px; right: 72px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: {muted};
}}
.hairline {{
  position: absolute;
  bottom: 130px; left: 72px; right: 72px;
  height: 1px;
  background: {slate};
}}
.h-massive {{
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.028em;
  white-space: pre-line;
}}
.h-large {{
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.022em;
}}
.body {{
  font-weight: 400;
  font-size: 32px;
  line-height: 1.45;
  color: {muted};
  letter-spacing: -0.005em;
  max-width: 880px;
}}
</style>
</head>
<body>
<div class="slide">
{content}
</div>
</body>
</html>
"""


def html_for_slide(s):
    abyss, light, signal, muted, slate = (
        BRAND["abyss"], BRAND["light"], BRAND["signal"], BRAND["muted"], BRAND["slate"]
    )

    if s["type"] == "cover":
        content = f"""
<div class="tag-top" style="color:{s['tag_color']}">{s['tag_top']}</div>
<div style="position:absolute; top:50%; left:72px; right:72px; transform:translateY(-50%);">
  <div class="h-massive" style="font-size:172px;">{s['headline']}</div>
  <div class="h-large" style="font-size:88px; color:{signal}; margin-top:18px;">{s['subhead']}</div>
</div>
<div class="hairline"></div>
<div class="tag-bottom"><span>{s['tag_left']}</span><span>{s['tag_right']}</span></div>
"""

    elif s["type"] == "diagnostic":
        content = f"""
<div class="tag-top" style="color:{s['tag_color']}">{s['tag_top']}</div>
<div style="position:absolute; top:50%; left:72px; right:72px; transform:translateY(-58%);">
  <div class="h-massive" style="font-size:118px;">{s['headline']}</div>
  <div class="body" style="margin-top:48px;">{s['body']}</div>
</div>
<div class="hairline"></div>
<div class="tag-bottom"><span>{s['tag_left']}</span><span>{s['tag_right']}</span></div>
"""

    elif s["type"] == "references":
        lines_html = "".join(
            f'<div class="h-massive" style="font-size:118px;">{line}</div>'
            for line in s["headline_lines"]
        )
        content = f"""
<div class="tag-top" style="color:{s['tag_color']}">{s['tag_top']}</div>
<div style="position:absolute; top:50%; left:72px; right:72px; transform:translateY(-58%);">
  {lines_html}
  <div class="body" style="margin-top:48px;">{s['body']}</div>
</div>
<div class="hairline"></div>
<div class="tag-bottom"><span>{s['tag_left']}</span><span>{s['tag_right']}</span></div>
"""

    elif s["type"] == "thesis":
        content = f"""
<div class="tag-top" style="color:{s['tag_color']}">{s['tag_top']}</div>
<div style="position:absolute; top:50%; left:72px; right:72px; transform:translateY(-58%);">
  <div class="h-massive" style="font-size:148px;">{s['headline_a']}</div>
  <div class="h-massive" style="font-size:148px; color:{signal};">{s['headline_b']}</div>
  <div class="body" style="margin-top:56px;">{s['body']}</div>
</div>
<div class="hairline"></div>
<div class="tag-bottom"><span>{s['tag_left']}</span><span>{s['tag_right']}</span></div>
"""

    elif s["type"] == "cta":
        content = f"""
<div class="tag-top" style="color:{s['tag_color']}">{s['tag_top']}</div>
<div style="position:absolute; top:50%; left:72px; right:72px; transform:translateY(-60%); text-align:left;">
  <div class="h-massive" style="font-size:264px; letter-spacing:-0.04em;">{s['wordmark']}</div>
  <div class="h-large" style="font-size:64px; color:{signal}; margin-top:14px;">{s['subline']}</div>
  <div class="body" style="margin-top:44px;">{s['body']}</div>
</div>
<div style="position:absolute; bottom:170px; left:72px; right:72px;">
  <div style="display:inline-block; background:{signal}; color:{light}; padding:24px 44px; font-size:24px; font-weight:800; letter-spacing:0.18em; text-transform:uppercase;">Start your project →</div>
  <div style="margin-top:18px; font-size:20px; color:{muted}; font-weight:300; letter-spacing:0.18em;">{s['cta_text']}</div>
</div>
<div class="hairline"></div>
<div class="tag-bottom"><span>{s['tag_left']}</span><span>{s['tag_right']}</span></div>
"""

    return HTML_BASE.format(
        W=W, H=H,
        abyss=abyss, light=light, muted=muted, slate=slate,
        content=content
    )


# ============================================================================
# SVG GENERATOR — pro Figma (texto editável, font-family Sora)
# ============================================================================

def svg_text(x, y, text, *, size, weight, color, letter_spacing=0, text_anchor="start"):
    """Helper que gera <text> com Sora."""
    return (
        f'<text x="{x}" y="{y}" '
        f'font-family="Sora, system-ui, sans-serif" '
        f'font-size="{size}" '
        f'font-weight="{weight}" '
        f'fill="{color}" '
        f'letter-spacing="{letter_spacing}" '
        f'text-anchor="{text_anchor}">{text}</text>'
    )


def svg_for_slide(s):
    abyss, light, signal, muted, slate = (
        BRAND["abyss"], BRAND["light"], BRAND["signal"], BRAND["muted"], BRAND["slate"]
    )

    pad = 72
    parts = []

    # Background
    parts.append(f'<rect width="{W}" height="{H}" fill="{abyss}"/>')

    # Top tag (uppercase, letterspaced)
    parts.append(svg_text(
        pad, pad + 22,
        s["tag_top"].upper(),
        size=19, weight=300, color=s["tag_color"], letter_spacing="6"
    ))

    # Hairline near bottom
    parts.append(
        f'<line x1="{pad}" y1="{H-130}" x2="{W-pad}" y2="{H-130}" '
        f'stroke="{slate}" stroke-width="1"/>'
    )

    # Bottom tags
    parts.append(svg_text(
        pad, H - pad - 4,
        s["tag_left"].upper(),
        size=18, weight=300, color=muted, letter_spacing="6"
    ))
    parts.append(svg_text(
        W - pad, H - pad - 4,
        s["tag_right"].upper(),
        size=18, weight=300, color=muted, letter_spacing="6", text_anchor="end"
    ))

    # Content por tipo
    if s["type"] == "cover":
        # Headline mega + subhead em signal
        parts.append(svg_text(
            pad, 660,
            s["headline"],
            size=172, weight=800, color=light, letter_spacing="-4.8"
        ))
        parts.append(svg_text(
            pad, 770,
            s["subhead"],
            size=88, weight=800, color=signal, letter_spacing="-1.9"
        ))

    elif s["type"] == "diagnostic":
        # Headline em duas linhas
        h_lines = s["headline"].split("\n")
        y0 = 590
        for i, line in enumerate(h_lines):
            parts.append(svg_text(
                pad, y0 + i * 118,
                line,
                size=118, weight=800, color=light, letter_spacing="-3.3"
            ))
        # Body multi-line — quebra simples por largura
        parts.append(_svg_body(s["body"], pad, y0 + len(h_lines) * 118 + 60, max_chars=44))

    elif s["type"] == "references":
        y0 = 540
        for i, line in enumerate(s["headline_lines"]):
            parts.append(svg_text(
                pad, y0 + i * 118,
                line,
                size=118, weight=800, color=light, letter_spacing="-3.3"
            ))
        parts.append(_svg_body(s["body"], pad, y0 + len(s["headline_lines"]) * 118 + 60, max_chars=44))

    elif s["type"] == "thesis":
        parts.append(svg_text(
            pad, 600,
            s["headline_a"],
            size=148, weight=800, color=light, letter_spacing="-4.1"
        ))
        parts.append(svg_text(
            pad, 740,
            s["headline_b"],
            size=148, weight=800, color=signal, letter_spacing="-4.1"
        ))
        parts.append(_svg_body(s["body"], pad, 850, max_chars=44))

    elif s["type"] == "cta":
        # Wordmark gigante
        parts.append(svg_text(
            pad, 540,
            s["wordmark"],
            size=264, weight=800, color=light, letter_spacing="-10.5"
        ))
        parts.append(svg_text(
            pad, 620,
            s["subline"],
            size=64, weight=800, color=signal, letter_spacing="-1.4"
        ))
        parts.append(_svg_body(s["body"], pad, 720, max_chars=44))
        # CTA button
        btn_y = 1010
        parts.append(
            f'<rect x="{pad}" y="{btn_y}" width="430" height="76" fill="{signal}"/>'
        )
        parts.append(svg_text(
            pad + 32, btn_y + 50,
            "START YOUR PROJECT →",
            size=24, weight=800, color=light, letter_spacing="4.3"
        ))
        parts.append(svg_text(
            pad, btn_y + 130,
            s["cta_text"].upper(),
            size=20, weight=300, color=muted, letter_spacing="3.6"
        ))

    body = "\n".join(parts)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
{body}
</svg>'''


def _svg_body(text, x, y, max_chars=44):
    """Quebra o body em linhas <tspan> respeitando max_chars por linha."""
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        candidate = (cur + " " + w).strip()
        if len(candidate) <= max_chars:
            cur = candidate
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)

    line_height = 46
    tspans = "".join(
        f'<tspan x="{x}" dy="{0 if i == 0 else line_height}">{line}</tspan>'
        for i, line in enumerate(lines)
    )
    return (
        f'<text x="{x}" y="{y}" '
        f'font-family="Sora, system-ui, sans-serif" '
        f'font-size="32" font-weight="400" '
        f'fill="{BRAND["muted"]}" letter-spacing="-0.16">'
        f'{tspans}</text>'
    )


# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    base = Path("/home/claude/irbis")
    html_dir = base / "slides"
    svg_dir = base / "slides_svg"
    html_dir.mkdir(parents=True, exist_ok=True)
    svg_dir.mkdir(parents=True, exist_ok=True)

    for s in SLIDES:
        # HTML
        html = html_for_slide(s)
        (html_dir / f"slide_{s['name']}.html").write_text(html, encoding="utf-8")
        # SVG
        svg = svg_for_slide(s)
        (svg_dir / f"slide_{s['name']}.svg").write_text(svg, encoding="utf-8")

    print(f"Generated {len(SLIDES)} HTML files at {html_dir}")
    print(f"Generated {len(SLIDES)} SVG files at {svg_dir}")
