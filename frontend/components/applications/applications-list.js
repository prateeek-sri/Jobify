"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  Building2,
  MapPin,
  ExternalLink,
  CalendarClock,
  X,
} from "lucide-react"; // <--- Added X icon
import { showProfessionalToast } from "@/components/customToast";

const COLUMNS = {
  APPLIED: {
    id: "APPLIED",
    title: "Applied",
    color: "bg-transparent",
    lightColor: "bg-[#e0f0ff] dark:bg-blue-900/10",
  },
  INTERVIEW: {
    id: "INTERVIEW",
    title: "Interviewing",
    color: "bg-transparent",
    lightColor: "bg-[#e9ddff] dark:bg-purple-900/10",
  },
  OFFER: {
    id: "OFFER",
    title: "Offers",
    color: "bg-transparent",
    lightColor: "bg-[#d4f5df] dark:bg-emerald-900/10",
  },
  REJECTED: {
    id: "REJECTED",
    title: "Rejected",
    color: "bg-transparent",
    lightColor: "bg-[#fce1df] dark:bg-red-900/10",
  },
};

export function ApplicationsList({ applications, setApplications }) {
  const handleDelete = async (e, appId) => {
    e.stopPropagation(); // Stop drag event from firing

    // Optional: Add a simple confirm check
    // if (!confirm("Remove this application?")) return;

    // 1. Optimistic Update (Remove immediately from UI)
    const previousApps = [...applications];
    const newApps = applications.filter((app) => app._id !== appId);
    setApplications(newApps);

    try {
      // 2. Call API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/application/${appId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg || "Failed to delete");
      }
      showProfessionalToast("Application removed");
    } catch (err) {
      showProfessionalToast("Failed to remove. Restoring...");
      setApplications(previousApps); // Revert UI if API fails
    }
  };

  if (!applications || applications.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="size-16 rounded-full bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center mb-4">
            <Inbox className="size-8 text-black dark:text-white" />
          </div>
          <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
            No applications yet
          </h3>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 text-center">
            Go to "Find Jobs" and swipe right to populate this board.
          </p>
        </CardContent>
      </Card>
    );
  }

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Optimistic Update
    const newApps = [...applications];
    const appIndex = newApps.findIndex((a) => a._id === draggableId);
    if (appIndex === -1) return;

    const previousApps = JSON.parse(JSON.stringify(applications));
    newApps[appIndex].status = destination.droppableId;
    setApplications(newApps);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/application/${draggableId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: destination.droppableId }),
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.msg);
    } catch (err) {
      console.error("Failed to update status", err);
      showProfessionalToast("Failed to save move. Reverting...");
      setApplications(previousApps);
    }
  };

  const getAppsByStatus = (status) =>
    applications.filter((app) => app.status === status);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full mb-24">
        {Object.values(COLUMNS).map((column) => (
          <div
            key={column.id}
            className={`flex flex-col rounded-xl border border-border/50 h-[calc(100vh-240px)] min-h-[500px] ${column.lightColor}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-border/10 flex items-center justify-between">
              <h2 className="font-bold text-base text-black dark:text-white">
                {column.title}
              </h2>
              <Badge
                variant="secondary"
                className="bg-white/50 dark:bg-black/20 text-xs"
              >
                {getAppsByStatus(column.id).length}
              </Badge>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 p-2 space-y-2 overflow-y-auto"
                >
                  {getAppsByStatus(column.id).map((app, index) => (
                    <Draggable
                      key={app._id}
                      draggableId={app._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`cursor-grab hover:shadow-md transition-all border-0 shadow-sm bg-white dark:bg-zinc-900 group rounded-xl ${
                            snapshot.isDragging
                              ? "shadow-xl ring-2 ring-primary/20 rotate-2 z-50"
                              : ""
                          }`}
                        >
                          <CardContent className="p-4 relative">
                            {/* Actions overlay */}
                            <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {app.jobId?.applyUrl && (
                                <a
                                  href={app.jobId.applyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-blue-500 transition-colors bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800"
                                  title="View Application"
                                >
                                  <ExternalLink className="size-3.5" />
                                </a>
                              )}
                              <button
                                onClick={(e) => handleDelete(e, app._id)}
                                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-md text-zinc-400 hover:text-red-500 transition-colors bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800"
                                title="Remove Application"
                              >
                                <X className="size-3.5" />
                              </button>
                            </div>

                            <div className="flex gap-3 mb-4">
                              <div className="flex-shrink-0 flex items-center justify-center">
                                {app.jobId?.companyLogo ? (
                                  <img
                                    src={app.jobId.companyLogo}
                                    alt="Company Logo"
                                    className="w-10 h-10 rounded object-contain bg-white border border-gray-100 dark:border-zinc-800 p-0.5"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                                    <Building2 className="size-5 text-zinc-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 pr-6">
                                <h3
                                  className="font-bold text-sm text-black dark:text-white leading-tight"
                                  title={app.jobId?.title}
                                >
                                  {app.jobId?.title || "Unknown Role"}
                                </h3>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {app.jobId?.company || "Unknown"}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                               <div className="flex items-center gap-1.5">
                                 <CalendarClock className="size-3.5" />
                                 <span>date applied</span>
                               </div>
                               <div className="text-black dark:text-white font-medium">
                                 {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                               </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
