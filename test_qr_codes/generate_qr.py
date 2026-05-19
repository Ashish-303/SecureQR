import qrcode
import os

# ============================================================
# SecureQR — Test QR Code Generator
# URLs sourced directly from urldata.csv (Kaggle dataset)
# Generates: 20 SAFE + 20 MALICIOUS QR codes
# ============================================================

# ─────────────────────────────────────────────────────────────
# SAFE URLs  (label: benign)
# ─────────────────────────────────────────────────────────────
safe_urls = [
    "https://www.users6.nofeehost.com/aldenh/157.html",
    "https://www.wwp.greenwichmeantime.com/time-zone/usa/eastern-time/",
    "https://www.emendeebolduc.blogspot.com/",
    "https://www.uk.linkedin.com/pub/tim-ireland/0/b0b/a84",
    "https://www.bartleby.com/145/ww172.html",
    "https://www.yelp.ca/biz/st-georges-crescentwood-anglican-church-winnipeg",
    "https://www.malevalley.com/2010/05/mark-anthony-fernandez-hot-photos.html",
    "https://www.ctidirectory.com/companybrowse/companylistbygroup.cfm?l1=968",
    "https://www.dooneyscafe.com/archives/34",
    "https://www.pacific.edu/Brubeck-Institute.html",
    "https://www.vimeo.com/28132501",
    "https://www.news.yahoo.com/cincinnati-bengals-vs-cleveland-browns-live-streaming-online-071022382.html",
    "https://www.skepticfiles.org/cultinfo/nuns.htm",
    "https://www.filepie.us/?title=Malayalam_films_of_1997",
    "https://www.mylittleshoebox.typepad.com/",
    "https://www.en.wikipedia.org/wiki/Autodesk",
    "https://www.ticketsnow.com/les-respectables-tickets/",
    "https://www.zara.com",
    "https://www.casadelpopolo.com/contents/casadelpopoloAbout",
    "https://www.corporationwiki.com/people/index.aspx/D/17/51/",
]

# ─────────────────────────────────────────────────────────────
# MALICIOUS URLs  (label: malicious — phishing / malware)
# ─────────────────────────────────────────────────────────────
malicious_urls = [
    "https://services.runescape.com-rv.ru/m=weblogin/oldschool_login666,168,259,34186448,590",
    "http://sparkdeal.in/secure/07iwuowocqas0kr0ay44mlaui3qazo7qmfc6tzlwfle6vvxwkrrw3shcmydc",
    "http://kinaroth.com/ftp/confi/secure/new/web.php",
    "http://ativa3.tempsite.ws/8fh34f3",
    "http://mxp2109.com",
    "http://crepovers.000webhostapp.com/scures.htm",
    "http://pxeuwhmghsnffbn.info/apache_handler.php",
    "http://www.spodelipochivka.com/aaa/action.html",
    "http://azercelilsurpris.lark.ru/indexfb.html?65581=",
    "http://138.201.44.4/informs.jsp",
    "https://securityceckpoins.000webhostapp.com/bayar/VisaPayments.html?fb_source=bookmark_apps",
    "http://udecodocs.net/sdi/76226f056bc679f0fafeb447e592827a/",
    "http://telesport-tv.com.ar/media/index.htm",
    "http://www.kf25zx.com/images/?http://us.battle.net/login/en",
    "https://storage.googleapis.com/356644/bankofamerica.html",
    "http://lewinmedical.com/bp/page/pub/xbank/home",
    "http://inexglobal.com/proposal/Google/Google/Google/",
    "http://mobilsuzuki-jogjakarta.com/mobilsuzuki-jogjakarta.com/admin/sent_secured_documents_01/received_passworded_documents/backup/verified_documents_review/documentations_x/auth/view/share/",
    "http://mail.advecologica.org/zimbra/",
    "http://compass-reports.com/~market/verrify-id-information-account.net/Account/upz3kd8a4o4n4cnebpspffjhyah9mhd6x2075z80d2e85rc67uldzukovro8/",
]

# ─────────────────────────────────────────────────────────────
# GENERATE QR CODES
# ─────────────────────────────────────────────────────────────

output_dir = "test_qr_codes"
os.makedirs(output_dir, exist_ok=True)

def make_filename(prefix, url):
    """Convert URL into a clean filename."""
    clean = url.replace("https://", "").replace("http://", "")
    clean = clean.replace("/", "_").replace(".", "_").replace("?", "_").replace("=", "_").replace(",", "_")
    clean = clean[:60]  # Limit filename length
    return f"{prefix}_{clean}.png"

print(f"{'='*55}")
print(f"  SecureQR — Test QR Code Generator")
print(f"  Output folder: {os.path.abspath(output_dir)}")
print(f"{'='*55}\n")

print("Generating SAFE QR codes (20)...")
for i, url in enumerate(safe_urls, 1):
    filename = make_filename("safe", url)
    img = qrcode.make(url)
    img.save(os.path.join(output_dir, filename))
    print(f"   [{i:02d}/20] ✓  {filename}")

print(f"\nGenerating MALICIOUS QR codes (20)...")
for i, url in enumerate(malicious_urls, 1):
    filename = make_filename("malicious", url)
    img = qrcode.make(url)
    img.save(os.path.join(output_dir, filename))
    print(f"   [{i:02d}/20] ✓  {filename}")

safe_count = len([f for f in os.listdir(output_dir) if f.startswith("safe_")])
mal_count  = len([f for f in os.listdir(output_dir) if f.startswith("malicious_")])

print(f"\n{'='*55}")
print(f"  ✅ Done!")
print(f"  SAFE QR codes      : {safe_count}")
print(f"  MALICIOUS QR codes : {mal_count}")
print(f"  Total              : {safe_count + mal_count}")
print(f"  Saved in           : {os.path.abspath(output_dir)}")
print(f"{'='*55}")