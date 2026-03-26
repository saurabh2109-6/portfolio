"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PortfolioData } from "@/lib/portfolio";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");
  
  // Security State
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securityMessage, setSecurityMessage] = useState("");
  const [securityLoading, setSecurityLoading] = useState(false);

  const supabase = createBrowserSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setMessage("Saved successfully!");
    } else {
      setMessage("Failed to save.");
    }
    setSaving(false);
  };

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityLoading(true);
    setSecurityMessage("");
    
    const updates: any = {};
    if (newEmail) updates.email = newEmail;
    if (newPassword) updates.password = newPassword;

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      setSecurityMessage(`Error: ${error.message}`);
    } else {
      setSecurityMessage("Security settings updated successfully! Please check your email if you changed it.");
      setNewEmail("");
      setNewPassword("");
    }
    setSecurityLoading(false);
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!data) return;
    setData({
      ...data,
      personal: {
        ...data.personal,
        [e.target.name]: e.target.value,
      },
    });
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-8 pt-24">
      <div className="max-w-4xl mx-auto glass p-8 rounded-2xl border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Backend Controller</h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={async () => {
                setSyncing(true);
                try {
                  const res = await fetch("/api/portfolio");
                  const localData = await res.json();
                  const res2 = await fetch("/api/portfolio", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(localData),
                  });
                  if (res2.ok) setMessage("Data synced to Cloud!");
                  else setMessage("Sync failed.");
                } catch (e) {
                  setMessage("Sync failed: Check your connection.");
                }
                setSyncing(false);
              }}
              disabled={syncing}
              className="text-[10px] px-2 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-all border border-blue-500/20"
            >
              {syncing ? "Syncing..." : "Sync Local → Cloud"}
            </button>
            <Link href="/" className="text-sm text-purple-400 hover:underline">Back to Site</Link>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={data?.personal.name}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={data?.personal.title}
                  onChange={handlePersonalChange}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={data?.personal.description}
                onChange={handlePersonalChange}
                rows={3}
                className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none resize-none"
              />
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">About Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={data?.about.title}
                  onChange={(e) => setData({...data!, about: {...data!.about, title: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data?.about.subtitle}
                  onChange={(e) => setData({...data!, about: {...data!.about, subtitle: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">About Paragraphs</label>
                <button
                  type="button"
                  onClick={() => {
                    const newParagraphs = [...data!.about.paragraphs, "New paragraph text..."];
                    setData({...data!, about: {...data!.about, paragraphs: newParagraphs}});
                  }}
                  className="text-[10px] bg-purple-600/50 hover:bg-purple-600 px-2 py-0.5 rounded"
                >
                  + Add Paragraph
                </button>
              </div>
              <div className="space-y-2">
                {data?.about.paragraphs.map((p, i) => (
                  <div key={i} className="flex space-x-2">
                    <textarea
                      value={p}
                      onChange={(e) => {
                        const newParagraphs = [...data!.about.paragraphs];
                        newParagraphs[i] = e.target.value;
                        setData({...data!, about: {...data!.about, paragraphs: newParagraphs}});
                      }}
                      className="w-full px-3 py-2 glass rounded border border-white/10 text-sm outline-none resize-none"
                      rows={2}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newParagraphs = data!.about.paragraphs.filter((_, idx) => idx !== i);
                        setData({...data!, about: {...data!.about, paragraphs: newParagraphs}});
                      }}
                      className="text-red-400 hover:text-red-300 text-xs px-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Stats</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data?.about.stats.map((stat, i) => (
                  <div key={i} className="flex flex-col space-y-1">
                    <input
                      type="text"
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...data!.about.stats];
                        newStats[i].label = e.target.value;
                        setData({...data!, about: {...data!.about, stats: newStats}});
                      }}
                      className="px-3 py-1 glass rounded border border-white/10 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...data!.about.stats];
                        newStats[i].value = e.target.value;
                        setData({...data!, about: {...data!.about, stats: newStats}});
                      }}
                      className="px-3 py-1 glass rounded border border-white/10 text-xs font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h2 className="text-xl font-semibold">Skills Categories</h2>
              <button
                type="button"
                onClick={() => {
                  const newSkills = [...data!.skills, { title: "New Category", icon: "Code2", skills: ["New Skill"], color: "text-blue-400" }];
                  setData({...data!, skills: newSkills});
                }}
                className="text-xs bg-purple-600/50 hover:bg-purple-600 px-3 py-1 rounded"
              >
                + Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data?.skills.map((category, i) => (
                <div key={i} className="glass p-4 rounded-xl border border-white/10 space-y-3">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => {
                        const newSkills = [...data!.skills];
                        newSkills[i].title = e.target.value;
                        setData({...data!, skills: newSkills});
                      }}
                      className="bg-transparent font-bold outline-none border-b border-transparent focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = data!.skills.filter((_, idx) => idx !== i);
                        setData({...data!, skills: newSkills});
                      }}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, si) => (
                      <div key={si} className="flex items-center bg-white/5 rounded px-2 py-1">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...data!.skills];
                            newSkills[i].skills[si] = e.target.value;
                            setData({...data!, skills: newSkills});
                          }}
                          className="bg-transparent text-xs w-20 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSkills = [...data!.skills];
                            newSkills[i].skills = category.skills.filter((_, idx) => idx !== si);
                            setData({...data!, skills: newSkills});
                          }}
                          className="text-xs ml-1 opacity-50 hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const newSkills = [...data!.skills];
                        newSkills[i].skills.push("New Skill");
                        setData({...data!, skills: newSkills});
                      }}
                      className="text-xs bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h2 className="text-xl font-semibold">Projects</h2>
              <button
                type="button"
                onClick={() => {
                  const newProjects = [...data!.projects, {
                    title: "New Project",
                    description: "Project description",
                    image: "🚀",
                    tags: ["React"],
                    category: "Web",
                    github: "#",
                    live: "#"
                  }];
                  setData({...data!, projects: newProjects});
                }}
                className="text-xs bg-purple-600/50 hover:bg-purple-600 px-3 py-1 rounded"
              >
                + Add Project
              </button>
            </div>
            <div className="space-y-4">
              {data?.projects.map((project, i) => (
                <div key={i} className="glass p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...data!.projects];
                        newProjects[i].title = e.target.value;
                        setData({...data!, projects: newProjects});
                      }}
                      className="w-full bg-transparent font-bold text-lg outline-none border-b border-transparent focus:border-purple-500"
                      placeholder="Project Title"
                    />
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...data!.projects];
                        newProjects[i].description = e.target.value;
                        setData({...data!, projects: newProjects});
                      }}
                      className="w-full bg-transparent text-sm text-muted-foreground outline-none resize-none"
                      rows={2}
                      placeholder="Project Description"
                    />
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, ti) => (
                        <div key={ti} className="flex items-center bg-purple-500/10 text-purple-300 rounded-full px-2 py-0.5 text-xs">
                          <input
                            type="text"
                            value={tag}
                            onChange={(e) => {
                              const newProjects = [...data!.projects];
                              newProjects[i].tags[ti] = e.target.value;
                              setData({...data!, projects: newProjects});
                            }}
                            className="bg-transparent w-16 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newProjects = [...data!.projects];
                              newProjects[i].tags = project.tags.filter((_, idx) => idx !== ti);
                              setData({...data!, projects: newProjects});
                            }}
                            className="ml-1 opacity-50 hover:opacity-100 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const newProjects = [...data!.projects];
                          newProjects[i].tags.push("Tag");
                          setData({...data!, projects: newProjects});
                        }}
                        className="text-[10px] bg-purple-500/20 hover:bg-purple-500/30 px-2 py-1 rounded-full border border-purple-500/20"
                      >
                        + Tag
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs opacity-50">GitHub</label>
                        <input
                          type="text"
                          value={project.github}
                          onChange={(e) => {
                            const newProjects = [...data!.projects];
                            newProjects[i].github = e.target.value;
                            setData({...data!, projects: newProjects});
                          }}
                          className="bg-transparent border-b border-white/10 outline-none w-2/3 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs opacity-50">Live</label>
                        <input
                          type="text"
                          value={project.live}
                          onChange={(e) => {
                            const newProjects = [...data!.projects];
                            newProjects[i].live = e.target.value;
                            setData({...data!, projects: newProjects});
                          }}
                          className="bg-transparent border-b border-white/10 outline-none w-2/3 text-right"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-xs opacity-50">Category</label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => {
                            const newProjects = [...data!.projects];
                            newProjects[i].category = e.target.value;
                            setData({...data!, projects: newProjects});
                          }}
                          className="bg-transparent border-b border-white/10 outline-none w-2/3 text-right"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newProjects = data!.projects.filter((_, idx) => idx !== i);
                        setData({...data!, projects: newProjects});
                      }}
                      className="w-full py-1 text-xs text-red-400 border border-red-500/20 rounded hover:bg-red-500/10 transition-colors"
                    >
                      Delete Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Socials Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-2">Contact & Socials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="text"
                  value={data?.contact.email}
                  onChange={(e) => setData({...data!, contact: {...data!.contact, email: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={data?.socials.github}
                  onChange={(e) => setData({...data!, socials: {...data!.socials, github: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={data?.socials.linkedin}
                  onChange={(e) => setData({...data!, socials: {...data!.socials, linkedin: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Footer Email (mailto link)</label>
                <input
                  type="text"
                  value={data?.socials.email}
                  onChange={(e) => setData({...data!, socials: {...data!.socials, email: e.target.value}})}
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Security Settings Section */}
          <section className="space-y-4 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-red-400">Security Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Admin Email (ID)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-red-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full px-4 py-2 glass rounded-lg border border-white/10 focus:border-red-500 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleSecurityUpdate}
                disabled={securityLoading || (!newEmail && !newPassword)}
                className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-all"
              >
                {securityLoading ? "Updating..." : "Update Security Credentials"}
              </button>
              {securityMessage && <span className="text-xs text-red-400">{securityMessage}</span>}
            </div>
          </section>

          <div className="flex items-center space-x-4 pt-8">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 rounded-lg font-medium transition-all"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            {message && <span className={message.includes("success") ? "text-green-400" : "text-red-400"}>{message}</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
