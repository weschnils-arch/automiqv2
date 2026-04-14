import jsPDF from 'jspdf'
import type { Lang } from '../../i18n/translations'

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

const leversByPainPoint: Record<Lang, Record<string, Lever[]>> = {
  de: {
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
  },
  en: {
    bottleneck: [
      {
        title: '1. Delegate recurring tasks with AI assistants',
        why: 'When everything depends on you, it\'s often because of tasks that only you do "right." Many of these can be standardized with an AI assistant -- answering emails, drafting proposals, coordinating appointments.',
        tool: 'ChatGPT (free) or Claude.ai',
        toolUrl: 'https://chat.openai.com / https://claude.ai',
        howTo: 'Create 3 templates for your most common email types. Use ChatGPT to pre-draft responses. Time saved: approx. 3-5 hours/week.',
      },
      {
        title: '2. Document and automate standard processes',
        why: 'As long as processes only exist in your head, you can\'t delegate. The first step: write down what you do daily.',
        tool: 'Make.com (free up to 1,000 operations/month)',
        toolUrl: 'https://make.com',
        howTo: 'Choose ONE process (e.g., sending a proposal after an inquiry). Document the steps. Build a Make workflow that triggers the process automatically.',
      },
      {
        title: '3. Reduce client communication load with an AI chatbot',
        why: '80% of client inquiries are recurring. A simple chatbot on your website answers them 24/7 -- without you.',
        tool: 'Tidio (free up to 50 conversations/month)',
        toolUrl: 'https://tidio.com',
        howTo: 'Install Tidio on your website. Train the bot with your 10 most common questions. Result: fewer calls, more qualified inquiries.',
      },
    ],
    manual: [
      {
        title: '1. Automatically create invoices & proposals',
        why: 'Manual invoice creation costs an average of 15-20 minutes each. With 20 invoices/month, that\'s over 6 hours -- that a tool handles in seconds.',
        tool: 'FreshBooks or Wave (from $0/month)',
        toolUrl: 'https://freshbooks.com / https://waveapps.com',
        howTo: 'Import your client data. Create templates for your most common services. Activate automatic invoice sending after service delivery.',
      },
      {
        title: '2. Appointment booking without email ping-pong',
        why: 'Every appointment scheduled via email costs 3-5 messages back and forth. A booking tool eliminates that completely.',
        tool: 'Cal.com (open source, free)',
        toolUrl: 'https://cal.com',
        howTo: 'Set up your availability. Share the booking link instead of "When works for you?" Connect it to your calendar.',
      },
      {
        title: '3. Digitize documents & forms',
        why: 'Paper forms, manual data entry, and Excel spreadsheets are the biggest hidden time wasters in SMBs.',
        tool: 'Tally.so (free) for forms + Google Sheets',
        toolUrl: 'https://tally.so',
        howTo: 'Digitize your most-used paper form with Tally. Connect it to Google Sheets. Result: no more manual data entry.',
      },
    ],
    'growth-chaos': [
      {
        title: '1. Centralize client management',
        why: 'More clients mean more chaos -- when information is scattered across emails, notes, and people\'s heads. A simple CRM creates order.',
        tool: 'HubSpot CRM (free)',
        toolUrl: 'https://hubspot.com/crm',
        howTo: 'Import your existing contacts. Define 3-4 deal stages (Inquiry > Proposal > Won > Lost). From now on: every client interaction is centrally documented.',
      },
      {
        title: '2. Standardize new client onboarding',
        why: 'When every new client is onboarded differently, it doesn\'t scale. A standard onboarding saves time and looks professional.',
        tool: 'Notion (free) + Make.com',
        toolUrl: 'https://notion.so',
        howTo: 'Create an onboarding checklist in Notion. Automate the sending of welcome emails and documents with Make.com.',
      },
      {
        title: '3. Bundle project overview & team communication',
        why: 'WhatsApp groups and email chains are not project management tools. With 5+ parallel projects, you need a board.',
        tool: 'Linear (free for small teams) or Asana',
        toolUrl: 'https://linear.app',
        howTo: 'Create a board per active project. Define status columns (To Do, In Progress, Done). Rule: anything not on the board doesn\'t exist.',
      },
    ],
    orientation: [
      {
        title: '1. Understand AI basics -- without the hype',
        why: 'Before you invest, you need to understand what AI can really do (and what it can\'t). 90% of the market is marketing noise.',
        tool: 'ChatGPT (free) -- use it as a learning tool',
        toolUrl: 'https://chat.openai.com',
        howTo: 'Ask ChatGPT: "Explain in simple terms how AI can be practically used in a [your industry] company with [X] employees." The answer gives you initial orientation.',
      },
      {
        title: '2. Identify your 3 biggest time wasters',
        why: 'The best starting point for automation is the tasks that cost the most time and create the least value.',
        tool: 'Toggl Track (free)',
        toolUrl: 'https://toggl.com/track',
        howTo: 'Track your working time by task type for one week. You\'ll be surprised how much time goes into admin, emails, and coordination.',
      },
      {
        title: '3. Implement one concrete quick win',
        why: 'Instead of planning for months, implement ONE thing. A quick success gives you motivation and proves the value of automation.',
        tool: 'Zapier (free, 100 tasks/month)',
        toolUrl: 'https://zapier.com',
        howTo: 'Connect two tools you already use (e.g., form > email notification > CRM entry). One Zap, 15 minutes setup, immediate effect.',
      },
    ],
    'bad-roi': [
      {
        title: '1. Audit existing tools -- which ones do you actually use?',
        why: 'Most companies pay for 5-10 tools but only use 30% of the features. Clean up first, then invest.',
        tool: 'A simple spreadsheet (Google Sheets)',
        toolUrl: 'https://sheets.google.com',
        howTo: 'List ALL tools you\'re paying for. Per tool: cost/month, users, actual usage (daily/weekly/never). Cancel everything marked "never."',
      },
      {
        title: '2. Introduce ROI measurement -- before the next investment',
        why: 'Without measurement, you never know if something is worth it. Define BEFORE buying what "success" means.',
        tool: 'Google Sheets + one clear metric per tool',
        toolUrl: 'https://sheets.google.com',
        howTo: 'For each tool, define: what should it save (hours/week, $/month)? Measure after 30 days. No improvement = cancel.',
      },
      {
        title: '3. Integration instead of isolated solutions',
        why: 'When your tools don\'t talk to each other, you lose the efficiency they\'re supposed to bring. Integration is often more valuable than a new tool.',
        tool: 'Make.com or Zapier (start free)',
        toolUrl: 'https://make.com',
        howTo: 'Identify the 2 tools between which you most often manually transfer data. Connect them with Make.com. Result: no more double data entry.',
      },
    ],
  },
}

function getLevers(answers: Record<string, string>, lang: Lang): Lever[] {
  const painPoint = answers['pain-point'] || ''
  const langLevers = leversByPainPoint[lang]
  return langLevers[painPoint] || langLevers['orientation']
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

const pdfStrings = {
  de: {
    tagline: 'KI-Strategie fuer KMU',
    title: 'Ihr persoenliches KI-Quick-Audit',
    createdFor: 'Erstellt fuer: ',
    intro: 'Ihre 3 konkreten Hebel',
    introText: 'Basierend auf Ihren Angaben haben wir 3 konkrete Massnahmen identifiziert, die Sie sofort umsetzen koennen -- mit kostenlosen Tools und ohne externe Hilfe.',
    whyLabel: 'Warum:',
    toolLabel: 'Empfohlenes Tool:',
    howLabel: 'So setzen Sie es um:',
    ctaTitle: 'Bereit fuer den naechsten Schritt?',
    ctaText: 'Diese 3 Hebel sind ein guter Anfang -- aber sie kratzen nur an der Oberflaeche. In der 90-Minuten KI-Potenzialanalyse gehen wir mit einem Experten tief in Ihre spezifischen Prozesse, identifizieren versteckte Potenziale und erstellen eine priorisierte Roadmap fuer Ihr Unternehmen.',
    ctaCta: '>> Jetzt KI Potentialanalyse starten: automiq.eu',
    footer: 'automiq -- KI-Strategie fuer KMU | automiq.eu',
  },
  en: {
    tagline: 'AI Strategy for SMBs',
    title: 'Your Personal AI Quick Audit',
    createdFor: 'Created for: ',
    intro: 'Your 3 Concrete Leverage Points',
    introText: 'Based on your answers, we\'ve identified 3 concrete actions you can implement immediately -- with free tools and no outside help.',
    whyLabel: 'Why:',
    toolLabel: 'Recommended Tool:',
    howLabel: 'How to implement:',
    ctaTitle: 'Ready for the next step?',
    ctaText: 'These 3 leverage points are a good start -- but they only scratch the surface. In the 90-minute AI Potential Analysis, we go deep into your specific processes with an expert, identify hidden potential, and create a prioritized roadmap for your business.',
    ctaCta: '>> Start your AI Potential Analysis now: automiq.eu',
    footer: 'automiq -- AI Strategy for SMBs | automiq.eu',
  },
}

export function generateFreebiesPDF(answers: Record<string, string>, lead: LeadInfo, lang: Lang = 'de'): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 25
  const contentWidth = pageWidth - margin * 2
  let y = 0
  const s = pdfStrings[lang]

  const blue: [number, number, number] = [37, 99, 235]
  const dark: [number, number, number] = [26, 26, 26]
  const gray: [number, number, number] = [119, 119, 119]
  const lightBg: [number, number, number] = [245, 245, 240]
  const white: [number, number, number] = [255, 255, 255]

  // --- HEADER ---
  doc.setFillColor(...blue)
  doc.rect(0, 0, pageWidth, 55, 'F')

  doc.setTextColor(...white)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('automiq', margin, 18)
  doc.setFontSize(7)
  doc.text(s.tagline, margin, 23)

  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text(s.title, margin, 40)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(s.createdFor + lead.name + '  |  ' + lead.company, margin, 48)

  y = 70

  // --- INTRO ---
  doc.setTextColor(...dark)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(s.intro, margin, y)
  y += 8

  doc.setTextColor(...gray)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const introLines = doc.splitTextToSize(s.introText, contentWidth)
  doc.text(introLines, margin, y)
  y += introLines.length * 5 + 12

  // --- LEVERS ---
  const levers = getLevers(answers, lang)

  for (const lever of levers) {
    const cardHeight = measureLeverHeight(doc, lever, contentWidth)

    if (y + cardHeight > pageHeight - 30) {
      doc.addPage()
      y = 25
    }

    const cardTop = y
    const pad = 7

    doc.setFillColor(...lightBg)
    doc.roundedRect(margin - 3, cardTop, contentWidth + 6, cardHeight, 3, 3, 'F')

    let cy = cardTop + pad

    // Title
    doc.setTextColor(...blue)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    const titleLines = doc.splitTextToSize(lever.title, contentWidth - 10)
    doc.text(titleLines, margin + pad - 4, cy)
    cy += titleLines.length * 5 + 4

    // Separator
    doc.setDrawColor(220, 220, 215)
    doc.setLineWidth(0.3)
    doc.line(margin + pad - 4, cy, margin + contentWidth - pad + 4, cy)
    cy += 5

    // Why
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text(s.whyLabel, margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const whyLines = doc.splitTextToSize(lever.why, contentWidth - 14)
    doc.text(whyLines, margin + pad - 4, cy)
    cy += whyLines.length * 4 + 6

    // Tool
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text(s.toolLabel, margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...blue)
    doc.text(lever.tool, margin + pad - 4, cy)
    cy += 5
    doc.setTextColor(...gray)
    doc.setFontSize(7)
    doc.text(lever.toolUrl, margin + pad - 4, cy)
    cy += 6

    // How to
    doc.setTextColor(...dark)
    doc.setFontSize(8.5)
    doc.setFont('helvetica', 'bold')
    doc.text(s.howLabel, margin + pad - 4, cy)
    cy += 5
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...gray)
    const howLines = doc.splitTextToSize(lever.howTo, contentWidth - 14)
    doc.text(howLines, margin + pad - 4, cy)
    cy += howLines.length * 4

    y = cardTop + cardHeight + 10
  }

  // --- CTA SECTION ---
  const ctaHeight = 55
  if (y + ctaHeight > pageHeight - 20) {
    doc.addPage()
    y = 25
  }

  doc.setFillColor(...blue)
  doc.roundedRect(margin - 3, y, contentWidth + 6, ctaHeight, 3, 3, 'F')

  doc.setTextColor(...white)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(s.ctaTitle, margin + 7, y + 15)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  const ctaLines = doc.splitTextToSize(s.ctaText, contentWidth - 14)
  doc.text(ctaLines, margin + 7, y + 24)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text(s.ctaCta, margin + 7, y + 47)

  // --- FOOTER ---
  doc.setTextColor(...gray)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text(s.footer, margin, pageHeight - 10)

  // Save
  doc.save('KI-Quick-Audit_' + lead.company.replace(/\s+/g, '_') + '.pdf')
}
