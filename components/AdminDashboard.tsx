"use client";
import React, { useState, useEffect } from "react";
import { HeroData, AboutData, Project, SocialLink } from "@/data";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hero");

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-64 max-h-screen overflow-y-auto sticky top-0 border-r border-border p-6 flex flex-col gap-4 bg-muted/20">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button onClick={() => setActiveTab("hero")} className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'hero' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Hero Section</button>
        <button onClick={() => setActiveTab("about")} className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'about' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>About Info</button>
        <button onClick={() => setActiveTab("projects")} className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'projects' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Projects</button>
        <button onClick={() => setActiveTab("contact")} className={`text-left px-4 py-2 rounded-md transition ${activeTab === 'contact' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>Social Links</button>
        <div className="mt-auto pt-4 border-t border-border">
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-500/10 transition font-bold">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <h1 className="text-4xl font-bold mb-4 capitalize">{activeTab} Data</h1>
        <ul className="border border-border rounded-2xl bg-indigo-400/30 p-4 mb-4">
          <li className="text-md text-muted-foreground mb-1">- Edit the content of the {activeTab} section</li>
          <li className="text-md text-muted-foreground mb-1">- use [newline] for new line text</li>
          <li className="text-md text-muted-foreground mb-1">- use image link only. as the image source (you can go <a className="text-blue-800 underline" href="https://imgaur.org/">imgaur.org</a> to upload you image and get image link)</li>
          <li className="text-md text-muted-foreground mb-1">- if you can't write on the field, you can paste your text in the json data below the field.</li>
          <li className="text-md text-muted-foreground mb-1">- to delete the field, you can leave it empty and update.</li>
        </ul>
        {activeTab === "hero" && <HeroAdmin />}
        {activeTab === "about" && <AboutAdmin />}
        {activeTab === "projects" && <ProjectsAdmin />}
        {activeTab === "contact" && <ContactAdmin />}
      </main>
    </div>
  );
}

// ============== HERO ADMIN ==============
function HeroAdmin() {
  const [data, setData] = useState<HeroData | null>(null);

  useEffect(() => {
    fetch('/api/hero').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    await fetch('/api/hero', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Saved Successfully");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Name</label>
        <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} className="p-3 bg-muted border border-border rounded-md focus:border-primary outline-none" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Main Title (Use [newline] for breaks)</label>
        <input value={data.mainTitle} onChange={e => setData({ ...data, mainTitle: e.target.value })} className="p-3 bg-muted border border-border rounded-md focus:border-primary outline-none" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Paragraph</label>
        <textarea rows={4} value={data.paragraph} onChange={e => setData({ ...data, paragraph: e.target.value })} className="p-3 bg-muted border border-border rounded-md focus:border-primary outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
        <h3 className="col-span-2 font-bold">Card 1</h3>
        <input value={data.card1.title} onChange={e => setData({ ...data, card1: { ...data.card1, title: e.target.value } })} className="p-3 bg-muted border border-border rounded-md" placeholder="Title" />
        <input value={data.card1.paragraph} onChange={e => setData({ ...data, card1: { ...data.card1, paragraph: e.target.value } })} className="p-3 bg-muted border border-border rounded-md" placeholder="Paragraph" />
      </div>
      <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
        <h3 className="col-span-2 font-bold">Card 2</h3>
        <input value={data.card2.title} onChange={e => setData({ ...data, card2: { ...data.card2, title: e.target.value } })} className="p-3 bg-muted border border-border rounded-md" placeholder="Title" />
        <input value={data.card2.paragraph} onChange={e => setData({ ...data, card2: { ...data.card2, paragraph: e.target.value } })} className="p-3 bg-muted border border-border rounded-md" placeholder="Paragraph" />
      </div>

      <button onClick={handleSave} className="bg-primary text-primary-foreground py-3 rounded-md font-bold mt-4 hover:opacity-90">Save Hero Data</button>
    </div>
  );
}

// ============== ABOUT ADMIN ==============
function AboutAdmin() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch('/api/about').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    await fetch('/api/about', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Saved Successfully");
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Description</label>
        <textarea rows={4} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} className="p-3 bg-muted border border-border rounded-md focus:border-primary outline-none" />
      </div>
      <h3 className="font-bold text-xl mt-4">Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm">Years</label>
          <input type="number" value={data.stats.years} onChange={e => setData({ ...data, stats: { ...data.stats, years: +e.target.value } })} className="w-full p-2 bg-muted border border-border rounded-md" />
        </div>
        <div>
          <label className="text-sm">Projects</label>
          <input type="number" value={data.stats.projects} onChange={e => setData({ ...data, stats: { ...data.stats, projects: +e.target.value } })} className="w-full p-2 bg-muted border border-border rounded-md" />
        </div>
        <div>
          <label className="text-sm">Satisfied %</label>
          <input type="number" value={data.stats.satisfied} onChange={e => setData({ ...data, stats: { ...data.stats, satisfied: +e.target.value } })} className="w-full p-2 bg-muted border border-border rounded-md" />
        </div>
        <div>
          <label className="text-sm">Industries</label>
          <input type="number" value={data.stats.industries} onChange={e => setData({ ...data, stats: { ...data.stats, industries: +e.target.value } })} className="w-full p-2 bg-muted border border-border rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-semibold">Process (JSON format)</label>
        <textarea rows={6} value={JSON.stringify(data.process, null, 2)} onChange={e => {
          try { setData({ ...data, process: JSON.parse(e.target.value) }); } catch { }
        }} className="p-3 font-mono text-sm bg-muted border border-border rounded-md" />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="font-semibold">Work Experience (JSON format)</label>
        <textarea rows={6} value={JSON.stringify(data.work_experience, null, 2)} onChange={e => {
          try { setData({ ...data, work_experience: JSON.parse(e.target.value) }); } catch { }
        }} className="p-3 font-mono text-sm bg-muted border border-border rounded-md" />
      </div>

      <button onClick={handleSave} className="bg-primary text-primary-foreground py-3 rounded-md font-bold mt-4 hover:opacity-90">Save About Data</button>
    </div>
  );
}

// ============== PROJECTS ADMIN ==============
function ProjectsAdmin() {
  const [data, setData] = useState<Project[]>([]);

  const fetchProjects = () => fetch('/api/projects').then(r => r.json()).then(setData);
  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async () => {
    const newProj = {
      title: "New Project", description: "Description", imageSrc: "/placeholder.png", technologies: ["React"], liveUrl: "", githubUrl: "", client: "Client", services: ["Design"], productionYear: new Date().getFullYear().toString(), detailedDescription: "", contentBlocks: []
    };
    await fetch('/api/projects', {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newProj)
    });
    fetchProjects();
  };

  const handleUpdate = async (p: Project) => {
    // A real app would have a PUT endpoint taking the ID. Right now our API just supports POST to insert/overwrite.
    // Wait, the API I wrote actually has a POST that inserts. If ID exists, it will fail unless INSERT OR REPLACE! Let's check api.
    // I will write a PUT block to the API. For now, let's just use POST since sqlite table projects has PRIMARY KEY.
    await fetch('/api/projects/' + p.id, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p)
    });
    fetchProjects();
  };

  return (
    <div className="flex flex-col gap-6">
      <button onClick={handleCreate} className="w-fit ml-auto bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold mb-4">Add New Project</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map(p => (
          <div key={p.id} className="border border-border p-4 rounded-md flex flex-col gap-3 bg-muted/20">
            <h3 className="font-bold border-b pb-2">Basic Info</h3>
            <div className="grid grid-cols-2 gap-2">
              <input value={p.title} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Title" />
              <textarea value={p.description} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, description: e.target.value } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Short Description" />
              <input value={p.imageSrc} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, imageSrc: e.target.value } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Image URL" />
              <input value={p.technologies.join(', ')} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, technologies: e.target.value.split(',').map(s => s.trim()) } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Technologies (comma separated)" />
              <input value={p.liveUrl} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, liveUrl: e.target.value } : x))} className="p-2 bg-muted border rounded-md" placeholder="Live URL" />
              <input value={p.githubUrl} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, githubUrl: e.target.value } : x))} className="p-2 bg-muted border rounded-md" placeholder="GitHub URL" />
            </div>

            <h3 className="font-bold border-b pb-2 mt-4">Details Page Info</h3>
            <div className="grid grid-cols-2 gap-2">
              <input value={p.client || ''} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, client: e.target.value } : x))} className="p-2 bg-muted border rounded-md" placeholder="Client Name" />
              <input value={p.productionYear || ''} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, productionYear: e.target.value } : x))} className="p-2 bg-muted border rounded-md" placeholder="Production Year" />
              <input value={(p.services || []).join(', ')} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, services: e.target.value.split(',').map(s => s.trim()) } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Services (comma separated)" />
              <textarea rows={4} value={p.detailedDescription || ''} onChange={e => setData(data.map(x => x.id === p.id ? { ...x, detailedDescription: e.target.value } : x))} className="col-span-2 p-2 bg-muted border rounded-md" placeholder="Detailed Full Description" />

              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-xs font-semibold">Content Blocks (JSON Array)</label>
                <textarea rows={4} value={JSON.stringify(p.contentBlocks || [], null, 2)} onChange={e => {
                  try { setData(data.map(x => x.id === p.id ? { ...x, contentBlocks: JSON.parse(e.target.value) } : x)); } catch { }
                }} className="p-2 bg-muted border rounded-md text-xs font-mono" placeholder='[{"type":"text-left", "text": "...", "image": "..."}]' />
              </div>
            </div>

            <button onClick={() => handleUpdate(p)} className="bg-primary text-primary-foreground py-2 rounded-md font-semibold mt-4">Update Project</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== CONTACT ADMIN ==============
function ContactAdmin() {
  const [data, setData] = useState<SocialLink[]>([]);

  useEffect(() => {
    fetch('/api/contact').then(r => r.json()).then(setData);
  }, []);

  const handleSave = async () => {
    await fetch('/api/contact', {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Saved Successfully");
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {data.map((link, idx) => (
        <div key={idx} className="flex gap-4 border p-4 rounded-md items-center">
          <input value={link.icon} onChange={e => { const nd = [...data]; nd[idx].icon = e.target.value; setData(nd); }} className="w-16 p-2 bg-muted border rounded-md text-center" placeholder="Icon" />
          <input value={link.platform} onChange={e => { const nd = [...data]; nd[idx].platform = e.target.value; setData(nd); }} className="w-1/3 p-2 bg-muted border rounded-md" placeholder="Platform" />
          <input value={link.url} onChange={e => { const nd = [...data]; nd[idx].url = e.target.value; setData(nd); }} className="flex-1 p-2 bg-muted border rounded-md" placeholder="URL" />
        </div>
      ))}
      <button onClick={() => setData([...data, { platform: "New", url: "", icon: "🌐" }])} className="border border-primary text-primary w-fit px-4 py-2 rounded-md font-bold">Add Platform</button>
      <button onClick={handleSave} className="bg-primary text-primary-foreground py-3 rounded-md font-bold mt-4 hover:opacity-90">Save Social Links</button>
    </div>
  );
}
