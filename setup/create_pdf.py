from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
import os

OUT = os.path.join(os.path.dirname(__file__), "jarvis-os-setup-ptbr.pdf")
W, H = A4
INK = HexColor("#21201B")
PAPER = HexColor("#F2EFE9")
SAGE = HexColor("#4A5D43")
SAGE_LIGHT = HexColor("#C7D5BB")
ORANGE = HexColor("#EF7B45")
MUTED = HexColor("#6D6A62")
DEEP = HexColor("#282722")

def paper(c):
    c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setStrokeColor(HexColor("#D8D1C6")); c.setLineWidth(.65)
    c.rect(12*mm, 12*mm, W-24*mm, H-24*mm, fill=0, stroke=1)

def header(c, n):
    c.setFillColor(INK); c.setFont("Helvetica", 8)
    c.drawString(18*mm, H-18*mm, "IRBIS / JARVIS OS")
    c.drawRightString(W-18*mm, H-18*mm, f"{n:02d}")
    c.setStrokeColor(INK); c.setLineWidth(.55); c.line(18*mm, H-22*mm, W-18*mm, H-22*mm)

def footer(c):
    c.setFillColor(MUTED); c.setFont("Courier", 7.5)
    c.drawString(18*mm, 17*mm, "FALE. ROTEIE. LEMBRE. REPITA.")

def label(c, text, x, y, color=SAGE):
    c.setFillColor(color); c.setFont("Courier-Bold", 8); c.drawString(x, y, text.upper())

def title(c, black, blue, y, size=40):
    c.setFillColor(INK); c.setFont("Times-Bold", size); c.drawString(22*mm, y, black)
    c.setFillColor(SAGE); c.drawString(22*mm, y-size*.98, blue)
    c.setStrokeColor(INK); c.setLineWidth(3); c.line(22*mm, y-size*2.0, W-42*mm, y-size*2.0)

def body(c, text, x, y, size=11, leading=16, color=INK, font="Helvetica"):
    c.setFillColor(color); c.setFont(font, size)
    for i, line in enumerate(text.split("\n")):
        c.drawString(x, y-i*leading, line)

def claude_mark(c, cx, cy, r=28):
    c.setStrokeColor(ORANGE); c.setLineWidth(3.2)
    for dx, dy in [(0,r),(r,0),(0,-r),(-r,0),(r*.7,r*.7),(-r*.7,r*.7),(r*.7,-r*.7),(-r*.7,-r*.7),(r*.36,r*.94),(-r*.36,r*.94),(r*.36,-r*.94),(-r*.36,-r*.94)]:
        c.line(cx-dx*.72, cy-dy*.72, cx+dx*.72, cy+dy*.72)

def terminal(c, x, y, w, h, lines):
    c.setFillColor(DEEP); c.roundRect(x, y, w, h, 6, fill=1, stroke=0)
    c.setFillColor(HexColor("#D6E648")); c.setFont("Courier", 9)
    for i, line in enumerate(lines): c.drawString(x+12, y+h-24-i*17, line)

def page_cover(c):
    paper(c); header(c, 1)
    label(c, "setup completo / pt-br", 22*mm, H-38*mm)
    c.setFillColor(INK); c.setFont("Times-Bold", 54); c.drawString(22*mm, H-75*mm, "Construa seu")
    c.setFillColor(SAGE); c.drawString(22*mm, H-101*mm, "JARVIS OS")
    c.setStrokeColor(SAGE); c.setLineWidth(1.4); c.line(22*mm, H-108*mm, W-22*mm, H-108*mm)
    body(c, "O mapa para montar motor, memória, voz e HUD — na ordem certa.", 22*mm, H-127*mm, 14, 19, MUTED)
    c.setFillColor(DEEP); c.roundRect(22*mm, 44*mm, W-44*mm, 88*mm, 8, fill=1, stroke=0)
    claude_mark(c, W-55*mm, 88*mm, 22)
    c.setFillColor(PAPER); c.setFont("Times-Bold", 27); c.drawString(30*mm, 104*mm, "O motor é Claude Code.")
    c.setFillColor(SAGE_LIGHT); c.setFont("Courier", 9); c.drawString(30*mm, 86*mm, "> recebe o pedido   > chama a skill   > devolve trabalho")
    c.setFillColor(MUTED); c.setFont("Courier", 7.5); c.drawString(22*mm, 25*mm, "IRBIS / NICOLAS CUNHA")
    c.showPage()

def page_overview(c):
    paper(c); header(c, 2); label(c, "a arquitetura", 22*mm, H-38*mm); title(c, "O sistema", "em uma página", H-63*mm, 42)
    body(c, "Você fala. O sistema roteia.\nA habilidade executa. O vault lembra.", 22*mm, H-135*mm, 15, 23, MUTED)
    rows = [("01", "CLAUDE CODE", "o motor", ORANGE), ("02", "OBSIDIAN", "a memória", HexColor("#6C45D9")), ("03", "VOZ LOCAL", "ouvidos + boca", HexColor("#286FD0")), ("04", "HUD ÚNICO", "o rosto", SAGE)]
    y = H-190*mm
    for num, name, desc, col in rows:
        c.setStrokeColor(INK); c.setLineWidth(.6); c.line(22*mm, y, W-22*mm, y)
        c.setFillColor(SAGE); c.setFont("Courier-Bold", 9); c.drawString(25*mm, y-12, num)
        c.setFillColor(col); c.setFont("Helvetica-Bold", 15); c.drawString(48*mm, y-12, name)
        c.setFillColor(MUTED); c.setFont("Helvetica", 11); c.drawString(106*mm, y-12, desc)
        y -= 27*mm
    c.line(22*mm, y, W-22*mm, y); footer(c); c.showPage()

def page_motor(c):
    paper(c); header(c, 3); label(c, "01 / motor", 22*mm, H-38*mm); title(c, "Conecte o", "cérebro", H-63*mm, 42)
    claude_mark(c, W-54*mm, H-92*mm, 28)
    body(c, "Claude Code é onde o pedido entra e o trabalho sai.\nEle não precisa saber tudo. Precisa saber qual skill chamar.", 22*mm, H-137*mm, 13, 19, MUTED)
    c.setStrokeColor(INK); c.setLineWidth(.7); c.rect(22*mm, 75*mm, W-44*mm, 98*mm, fill=0, stroke=1)
    label(c, "primeiras skills", 30*mm, 160*mm)
    body(c, "metrics   — puxa os números\ninbox     — briefing da manhã\ntrends    — lê o que mudou\nplan      — escreve as prioridades\nvault     — lê + grava memória", 30*mm, 145*mm, 11, 16, INK, "Courier")
    terminal(c, 111*mm, 83*mm, 75*mm, 58*mm, ["COMMAND DECK", "> METRICS PULL", "> INBOX BRIEF", "> PLAN TODAY"])
    footer(c); c.showPage()

def page_memory(c):
    paper(c); header(c, 4); label(c, "02 / memória", 22*mm, H-38*mm); title(c, "Construa a", "memória", H-63*mm, 42)
    body(c, "Se não está no vault, não aconteceu.\nA memória precisa ser arquivo: legível, versionável e sua.", 22*mm, H-116*mm, 13, 19, MUTED)
    c.setStrokeColor(INK); c.setLineWidth(.7); c.rect(22*mm, 78*mm, 72*mm, 72*mm, fill=0, stroke=1)
    body(c, "vault/\n  raw/\n    tudo capturado\n  wiki/\n    conhecimento útil\n  outputs/\n    saídas do JARVIS", 29*mm, 151*mm, 10.5, 14, INK, "Courier")
    items = ["Todo relatório vira markdown.", "Notas viram um grafo.", "O JARVIS consulta o grafo.", "Tudo é arquivo. Legível."]
    y = 151*mm
    for i, item in enumerate(items, 1):
        c.setFillColor(SAGE); c.setFont("Helvetica-Bold", 15); c.drawString(108*mm, y, str(i))
        c.setFillColor(INK); c.setFont("Courier", 10.5); c.drawString(125*mm, y, item); y -= 17*mm
    terminal(c, 22*mm, 38*mm, W-44*mm, 27*mm, ["VAULT / GRAPH VIEW", "●━━●━━●━━●━━●    ╲ ●━━●━━● ╱"])
    footer(c); c.showPage()

def page_voice(c):
    paper(c); header(c, 5); label(c, "03 / voz", 22*mm, H-38*mm); title(c, "Adicione", "a voz", H-63*mm, 42)
    body(c, "Push to talk. Segure espaço e fale.\nO áudio fica na máquina.", 22*mm, H-137*mm, 13, 19, MUTED)
    terminal(c, 22*mm, 105*mm, W-44*mm, 64*mm, ["LOCAL VOICE / ONLINE", "listening...", "“planeje meu dia”", "→ skill: plan", "→ resposta pronta"])
    body(c, "STT local — áudio não sai da máquina\nTTS local — o JARVIS responde em voz alta\nTempo para conectar: ~15 minutos", 22*mm, 86*mm, 10.5, 16, INK, "Courier")
    c.setFillColor(HexColor("#E9DDC7")); c.rotate(4); c.rect(125*mm, 48*mm, 58*mm, 30*mm, fill=1, stroke=0); c.rotate(-4)
    c.setFillColor(INK); c.setFont("Times-Italic", 12); c.drawString(132*mm, 65*mm, "privado por padrão")
    footer(c); c.showPage()

def page_hud(c):
    paper(c); header(c, 6); label(c, "04 / rosto", 22*mm, H-38*mm); title(c, "Construa o", "rosto", H-63*mm, 42)
    body(c, "Uma tela para vitais, agenda e comandos.\nO sistema deixa de ser um conjunto de abas.", 22*mm, H-137*mm, 13, 19, MUTED)
    c.setStrokeColor(INK); c.setLineWidth(1.1); c.roundRect(22*mm, 63*mm, W-44*mm, 80*mm, 6, fill=0, stroke=1)
    c.setFillColor(DEEP); c.rect(22*mm, 128*mm, W-44*mm, 15*mm, fill=1, stroke=0)
    c.setFillColor(SAGE_LIGHT); c.setFont("Courier", 8); c.drawString(29*mm, 134*mm, "JARVIS HUD / COMMAND DECK / ONLINE")
    body(c, "METRICS PULL       PLAN TODAY       VAULT CLEAN\nINBOX BRIEF         TREND SCAN       WEEK REVIEW", 30*mm, 113*mm, 9.5, 15, INK, "Courier")
    c.setFillColor(SAGE); c.setFont("Helvetica-Bold", 36); c.drawString(30*mm, 78*mm, "135.000")
    c.setFillColor(MUTED); c.setFont("Courier", 9); c.drawString(30*mm, 69*mm, "sinais · projetos · contexto · uma tela")
    footer(c); c.showPage()

def page_order(c):
    paper(c); header(c, 7); label(c, "ordem de montagem", 22*mm, H-38*mm); title(c, "Não comece", "pelo HUD", H-63*mm, 42)
    body(c, "A interface é a última peça. Primeiro, faça o sistema pensar e lembrar.", 22*mm, H-137*mm, 13, 19, MUTED)
    steps = [("01", "Wire the brain", "Crie skills pequenas, específicas e reutilizáveis."), ("02", "Build the memory", "Escolha onde cada captura, nota e saída vai morar."), ("03", "Add the voice", "Dê ao sistema uma entrada natural e privada."), ("04", "Build the face", "Só então coloque tudo em uma tela que você queira abrir.")]
    y = H-185*mm
    for n, h, p in steps:
        c.setFillColor(SAGE); c.setFont("Courier-Bold", 9); c.drawString(24*mm, y, n)
        c.setFillColor(INK); c.setFont("Times-Bold", 20); c.drawString(45*mm, y, h)
        c.setFillColor(MUTED); c.setFont("Helvetica", 10.5); c.drawString(45*mm, y-16, p)
        c.setStrokeColor(HexColor("#C7C1B7")); c.line(45*mm, y-28, W-24*mm, y-28); y -= 36*mm
    c.setFillColor(DEEP); c.roundRect(22*mm, 52*mm, W-44*mm, 38*mm, 7, fill=1, stroke=0)
    c.setFillColor(SAGE_LIGHT); c.setFont("Courier", 10); c.drawString(31*mm, 73*mm, "> foco na fiação. não no trabalho manual.")
    footer(c); c.showPage()

def page_prompt(c):
    paper(c); header(c, 8); label(c, "primeiro comando", 22*mm, H-38*mm); title(c, "Dê ao sistema", "um trabalho real", H-63*mm, 42)
    body(c, "Não comece com “faça qualquer coisa”.\nComece com um fluxo que já existe no seu dia.", 22*mm, H-137*mm, 13, 19, MUTED)
    c.setStrokeColor(INK); c.setLineWidth(.8); c.roundRect(22*mm, 85*mm, W-44*mm, 73*mm, 5, fill=0, stroke=1)
    body(c, "Crie uma skill chamada morning-brief.\nLeia minha agenda, inbox e notas do vault.\nRetorne as 3 prioridades do dia em voz alta.\nNão invente tarefas. Aponte o que falta.", 30*mm, 144*mm, 11, 17, INK, "Courier")
    label(c, "regra", 22*mm, 70*mm); body(c, "Uma skill. Um resultado. Um dono.", 22*mm, 59*mm, 15, 20, INK, "Times-Bold")
    footer(c); c.showPage()

def page_end(c):
    paper(c); header(c, 9); label(c, "agora rode", 22*mm, H-38*mm); c.setFillColor(INK); c.setFont("Times-Bold", 48); c.drawString(22*mm, H-82*mm, "Você já tem")
    c.setFillColor(SAGE); c.drawString(22*mm, H-111*mm, "o mapa.")
    c.setStrokeColor(INK); c.setLineWidth(3); c.line(22*mm, H-119*mm, W-30*mm, H-119*mm)
    body(c, "Agora escolha um fluxo real, conecte a primeira skill\ne coloque o sistema para trabalhar.", 22*mm, H-148*mm, 14, 20, MUTED)
    c.setFillColor(DEEP); c.roundRect(22*mm, 64*mm, W-44*mm, 60*mm, 8, fill=1, stroke=0)
    c.setFillColor(PAPER); c.setFont("Times-Bold", 25); c.drawString(31*mm, 96*mm, "FALE. ROTEIE. LEMBRE. REPITA.")
    c.setFillColor(SAGE_LIGHT); c.setFont("Courier", 9); c.drawString(31*mm, 80*mm, "JARVIS OS / SETUP COMPLETO / PT-BR")
    c.setFillColor(MUTED); c.setFont("Courier", 7.5); c.drawString(22*mm, 25*mm, "IRBIS / NICOLAS CUNHA")
    c.showPage()

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("JARVIS OS — Setup completo")
c.setAuthor("IRBIS / Nicolas Cunha")
page_cover(c); page_overview(c); page_motor(c); page_memory(c); page_voice(c); page_hud(c); page_order(c); page_prompt(c); page_end(c)
c.save()
print(OUT)
