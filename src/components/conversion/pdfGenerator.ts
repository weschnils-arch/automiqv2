import jsPDF from 'jspdf'

interface LeadInfo {
  name: string
  email: string
  company: string
}

interface Lever {
  title: string
  why: string
  tool: string
  toolUrl: string
  howTo: string
}

const leversByPainPoint: Record<string, Lever[]> = {
  bottleneck: [
    {
      title: '1. Wiederkehrende Aufgaben mit KI-Assistenten delegieren',
      why: 'Wenn alles an Ihnen haengt, liegt das oft an Aufgaben, die nur Sie "richtig" machen. Viele davon lassen sich mit einem KI-Assistenten standardisieren -- E-Mails beantworten, Angebote vorformulieren, Termine koordinieren.',
      tool: 'ChatGPT (kostenlos) oder Claude.ai',
      toolUrl: 'https://chat.openai.com / https://claude.ai',
      howTo: 'Erstellen Sie 3 Vorlagen fuer Ihre haeufigsten E-Mail-Typen. Nutzen Sie ChatGPT, um Antworten vorzuformulieren. Zeitersparnis: ca. 3-5 Stunden/Woche.',
    },
    {
      title: '2. Standard-Prozesse dokumentieren und automatisieren',
      why: 'Solange Prozesse nur in Ihrem Kopf existieren, koennen Sie nicht delegieren. Der erste Schritt: aufschreiben, was Sie taeglich tun.',
      tool: 'Make.com (kostenlos bis 1.000 Operationen/Monat)',
      toolUrl: 'https://make.com',
      howTo: 'Waehlen Sie EINEN Prozess (z.B. Angebotsversand nach Anfrage). Dokumentieren Sie die Schritte. Bauen Sie einen Make-Workflow, der den Prozess automatisch ausloest.',
    },
    {
      title: '3. Kundenkommunikation mit KI-Chatbot entlasten',
      why: '80% der Kundenanfragen sind wiederkehrend. Ein einfacher Chatbot auf Ihrer Website beantwortet diese rund um die Uhr -- ohne Sie.',
      tool: 'Tidio (kostenlos bis 50 Gespraeche/Monat)',
      toolUrl: 'https://tidio.com',
      howTo: 'Installieren Sie Tidio auf Ihrer Website. Trainieren Sie den Bot mit Ihren 10 haeufigsten Fragen. Ergebnis: weniger Anrufe, mehr qualifizierte Anfragen.',
    },
  ],
  manual: [
    {
      title: '1. Rechnungen & Angebote automatisch erstellen',
      why: 'Manuelle Rechnungserstellung kostet durchschnittlich 15-20 Minuten pro Stueck. Bei 20 Rechnungen/Monat sind das ueber 6 Stunden -- die ein Tool in Sekunden erledigt.',
      tool: 'sevDesk oder lexoffice (ab 0 EUR/Monat)',
      toolUrl: 'https://sevdesk.at / https://lexoffice.de',
      howTo: 'Importieren Sie Ihre Kundendaten. Erstellen Sie Vorlagen fuer Ihre haeufigsten Leistungen. Aktivieren Sie automatischen Rechnungsversand nach Leistungserbringung.',
    },
    {
      title: '2. Terminbuchung ohne E-Mail-Pingpong',
      why: 'Jede Terminvereinbarung per E-Mail kostet 3-5 Nachrichten hin und her. Ein Buchungstool eliminiert das komplett.',
      tool: 'Cal.com (Open Source, kostenlos)',
      toolUrl: 'https://cal.com',
      howTo: 'Richten Sie Ihre Verfuegbarkeiten ein. Teilen Sie den Buchungslink statt "Wann passt es Ihnen?". Verbinden Sie es mit Ihrem Kalender.',
    },
    {
      title: '3. Dokumente & Formulare digitalisieren',
      why: 'Papierformulare, manuelle Dateneingabe und Excel-Listen sind die groessten versteckten Zeitfresser in KMUs.',
      tool: 'Tally.so (kostenlos) fuer Formulare + Google Sheets',
      toolUrl: 'https://tally.so',
      howTo: 'Digitalisieren Sie Ihr meistgenutztes Papierformular mit Tally. Verbinden Sie es mit Google Sheets. Ergebnis: keine manuelle Dateneingabe mehr.',
    },
  ],
  'growth-chaos': [
    {
      title: '1. Kundenmanagement zentralisieren',
      why: 'Mehr Kunden bedeuten mehr Chaos -- wenn Informationen in E-Mails, Notizen und Koepfen verstreut sind. Ein einfaches CRM schafft Ordnung.',
      tool: 'HubSpot CRM (kostenlos)',
      toolUrl: 'https://hubspot.com/crm',
      howTo: 'Importieren Sie Ihre bestehenden Kontakte. Definieren Sie 3-4 Deal-Phasen (Anfrage > Angebot > Gewonnen > Verloren). Ab sofort: jede Kundeninteraktion wird zentral dokumentiert.',
    },
    {
      title: '2. Onboarding neuer Kunden standardisieren',
      why: 'Wenn jeder neue Kunde anders eingearbeitet wird, skaliert das nicht. Ein Standard-Onboarding spart Zeit und wirkt professionell.',
      tool: 'Notion (kostenlos) + Make.com',
      toolUrl: 'https://notion.so',
      howTo: 'Erstellen Sie eine Onboarding-Checkliste in Notion. Automatisieren Sie den Versand der Willkommens-E-Mail und Unterlagen mit Make.com.',
    },
    {
      title: '3. Projektuebersicht & Teamkommunikation buendeln',
      why: 'WhatsApp-Gruppen und E-Mail-Ketten sind keine Projektmanagement-Tools. Ab 5 parallelen Projekten brauchen Sie ein Board.',
      tool: 'Linear (kostenlos fuer kleine Teams) oder Asana',
      toolUrl: 'https://linear.app',
      howTo: 'Erstellen Sie ein Board pro aktivem Projekt. Definieren Sie Status-Spalten (To Do, In Arbeit, Erledigt). Regel: Alles, was nicht im Board steht, existiert nicht.',
    },
  ],
  orientation: [
    {
      title: '1. KI-Grundlagen verstehen -- ohne Hype',
      why: 'Bevor Sie investieren, muessen Sie verstehen, was KI wirklich kann (und was nicht). 90% des Marktes ist Marketing-Laerm.',
      tool: 'ChatGPT (kostenlos) -- als Lern-Tool nutzen',
      toolUrl: 'https://chat.openai.com',
      howTo: 'Fragen Sie ChatGPT: "Erklaere mir in einfacher Sprache, wie KI in einem [Ihre Branche]-Unternehmen mit [X] Mitarbeitern konkret eingesetzt werden kann." Die Antwort gibt Ihnen erste Orientierung.',
    },
    {
      title: '2. Ihre 3 groessten Zeitfresser identifizieren',
      why: 'Der beste Startpunkt fuer Automatisierung sind die Aufgaben, die am meisten Zeit kosten und am wenigsten Wert schaffen.',
      tool: 'Toggl Track (kostenlos)',
      toolUrl: 'https://toggl.com/track',
      howTo: 'Tracken Sie eine Woche lang Ihre Arbeitszeit nach Aufgabentyp. Sie werden ueberrascht sein, wie viel Zeit in Admin, E-Mails und Koordination fliesst.',
    },
    {
      title: '3. Einen konkreten Quick Win umsetzen',
      why: 'Statt monatelang zu planen, setzen Sie EINE Sache um. Ein schneller Erfolg gibt Ihnen Motivation und beweist den Wert von Automatisierung.',
      tool: 'Zapier (kostenlos, 100 Tasks/Monat)',
      toolUrl: 'https://zapier.com',
      howTo: 'Verbinden Sie zwei Tools, die Sie bereits nutzen (z.B. Formular > E-Mail-Benachrichtigung > CRM-Eintrag). Ein Zap, 15 Minuten Setup, sofortiger Effekt.',
    },
  ],
  'bad-roi': [
    {
      title: '1. Bestehende Tools auditieren -- was davon nutzen Sie wirklich?',
      why: 'Die meisten Unternehmen zahlen fuer 5-10 Tools, nutzen aber nur 30% der Funktionen. Zuerst aufraeumen, dann investieren.',
      tool: 'Eine einfache Tabelle (Google Sheets)',
      toolUrl: 'https://sheets.google.com',
      howTo: 'Listen Sie ALLE Tools auf, die Sie bezahlen. Pro Tool: Kosten/Monat, Nutzer, tatsaechliche Nutzung (taeglich/woechentlich/nie). Kuendigen Sie alles mit "nie".',
    },
    {
      title: '2. ROI-Messung einfuehren -- vor der naechsten Investition',
      why: 'Ohne Messung wissen Sie nie, ob sich etwas lohnt. Definieren Sie VOR dem Kauf, was "Erfolg" bedeutet.',
      tool: 'Google Sheets + eine klare Metrik pro Tool',
      toolUrl: 'https://sheets.google.com',
      howTo: 'Fuer jedes Tool definieren: Was soll es einsparen (Stunden/Woche, EUR/Monat)? Messen Sie nach 30 Tagen. Keine Verbesserung = kuendigen.',
    },
    {
      title: '3. Integration statt Inselloesungen',
      why: 'Wenn Ihre Tools nicht miteinander sprechen, verlieren Sie die Effizienz, die sie eigentlich bringen sollten. Integration ist oft wertvoller als ein neues Tool.',
      tool: 'Make.com oder Zapier (kostenlos starten)',
      toolUrl: 'https://make.com',
      howTo: 'Identifizieren Sie die 2 Tools, zwischen denen Sie am meisten manuell Daten uebertragen. Verbinden Sie sie mit Make.com. Ergebnis: keine doppelte Dateneingabe mehr.',
    },
  ],
}

const defaultLevers: Lever[] = leversByPainPoint['orientation']

function getLevers(answers: Record<string, string>): Lever[] {
  const painPoint = answers['pain-point'] || ''
  return leversByPainPoint[painPoint] || defaultLevers
}

function measureLeverHeight(doc: jsPDF, lever: Lever, contentWidth: number): number {
  let h = 0

  // Title
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  const titleLines = doc.splitTextToSize(lever.title, contentWidth - 10)
  h += titleLines.length * 5 + 8

  // "Warum:" label + text
  doc.setFontSize(8.5)
  const whyLines = doc.splitTextToSize(lever.why, contentWidth - 14)
  h += 5 + whyLines.length * 4 + 6

  // "Tool:" label + tool name + url
  h += 5 + 5 + 5 + 6

  // "So setzen Sie es um:" label + text
  doc.setFontSize(8.5)
  const howLines = doc.splitTextToSize(lever.howTo, contentWidth - 14)
  h += 5 + howLines.length * 4 + 8

  return h
}

export function generateFreebiesPDF(answers: Record<string, string>, lead: LeadInfo): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 25
  const contentWidth = pageWidth - margin * 2
  let y = 0

  const blue: [number, number, number] = [37, 99, 235]
  const dark: [number, number, number] = [26, 26, 26]
  const gray: [number, number, number] = [119, 119, 119]
  const lightBg: [number, number, number] = [245, 245, 240]
  const white: [number, number, number] = [255, 255, 255]

  // ─── HEADER ───
  doc.setFillColor(...blue)
  doc.rect(0, 0, pageWidth, 55, 'F')

  doc.setTextColor(...white)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('automiq', margin, 18)
  doc.setFontSize(7)
  doc.text('KI-Strategie fuer KMU', margin, 23)

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Ihr persoenliches KI-Quick-Audit', margin, 40)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Erstellt fuer: ' + lead.name + '  |  ' + lead.company, margin, 48)

  y = 70

  // ─── INTRO ───
  doc.setTextColor(...dark)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Ihre 3 konkreten Hebel', margin, y)
  y += 8

  doc.setTextColor(...gray)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const introText = 'Basierend auf Ihren Angaben haben wir 3 konkrete Massnahmen identifiziert, die Sie sofort umsetzen koennen -- mit kostenlosen Tools und ohne externe Hilfe.'
  const introLines = doc.splitTextToSize(introText, contentWidth)
  doc.text(introLines, margin, y)
  y += introLines.length * 5 + 12

  // ─── LEVERS ───
  const levers = getLevers(answers)

  for (const lever of levers) {
    // Pre-calculate total height of this lever card
    const cardHeight = measureLeverHeight(doc, lever, contentWidth)

    // New page if needed
    if (y + cardHeight > pageHeight - 30) {
      doc.addPage()
      y = 25
    }

    const cardTop = y
    const pad = 7

    // Draw background box FIRST
    doc.setFillColor(...lightBg)
    doc.roundedRect(margin - 3, cardTop, contentWidth + 6, cardHeight, 3, 3, 'F')

    // Draw content ON TOP of box
    let cy = cardTop + pad

    // Title
    doc.setTextColor(...blue)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    const titleLines = doc.splitTextToSize(lever.title, contentWidth - 10)
    doc.text(titleLines, margin + pad - 4, cy)
    cy += titleLines.length * 5 + 4

    // Separator line
    doc.setDrawColor(220, 220, 215)
    doc.setLineWidth(0.3)
    doc.line(margin + pad - 4, cy, margin + contentWidth - pad + 4, cy)
    cy += 5

    // "Warum:" section
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text('Warum:', margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const whyLines = doc.splitTextToSize(lever.why, contentWidth - 14)
    doc.text(whyLines, margin + pad - 4, cy)
    cy += whyLines.length * 4 + 6

    // "Empfohlenes Tool:" section
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text('Empfohlenes Tool:', margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...blue)
    doc.text(lever.tool, margin + pad - 4, cy)
    cy += 5
    doc.setTextColor(...gray)
    doc.setFontSize(7)
    doc.text(lever.toolUrl, margin + pad - 4, cy)
    cy += 6

    // "So setzen Sie es um:" section
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text('So setzen Sie es um:', margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const howLines = doc.splitTextToSize(lever.howTo, contentWidth - 14)
    doc.text(howLines, margin + pad - 4, cy)
    cy += howLines.length * 4

    y = cardTop + cardHeight + 10
  }

  // ─── CTA SECTION ───
  const ctaHeight = 55
  if (y + ctaHeight > pageHeight - 20) {
    doc.addPage()
    y = 25
  }

  // Blue CTA box
  doc.setFillColor(...blue)
  doc.roundedRect(margin - 3, y, contentWidth + 6, ctaHeight, 3, 3, 'F')

  doc.setTextColor(...white)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Bereit fuer den naechsten Schritt?', margin + 7, y + 15)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const ctaText = 'Diese 3 Hebel sind ein guter Anfang -- aber sie kratzen nur an der Oberflaeche. In der 90-Minuten KI-Potenzialanalyse gehen wir mit einem Experten tief in Ihre spezifischen Prozesse, identifizieren versteckte Potenziale und erstellen eine priorisierte Roadmap fuer Ihr Unternehmen.'
  const ctaLines = doc.splitTextToSize(ctaText, contentWidth - 14)
  doc.text(ctaLines, margin + 7, y + 24)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('>> Jetzt KI Potentialanalyse starten: automiq.eu', margin + 7, y + 47)

  // ─── FOOTER ───
  doc.setTextColor(...gray)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('automiq -- KI-Strategie fuer KMU | automiq.eu', margin, pageHeight - 10)

  // Save
  doc.save('KI-Quick-Audit_' + lead.company.replace(/\s+/g, '_') + '.pdf')
}
