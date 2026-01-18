

// Calculate when a part needs service
export const calculateNextService = async (part, currentCarMileage) => {
  const { lastChangeDate, lastChangeMileage, recommendedChangeInterval } = part;

  let nextServiceDate = null;
  let nextServiceMileage = null;

  // Calculate by date
  if (recommendedChangeInterval.months) {
    nextServiceDate = new Date(lastChangeDate);
    nextServiceDate.setMonth(
      nextServiceDate.getMonth() + recommendedChangeInterval.months,
    );
  }

  // Calculate by mileage
  if (recommendedChangeInterval.miles) {
    nextServiceMileage = lastChangeMileage + recommendedChangeInterval.miles;
  }

  return {
    partId: part._id,
    partName: part.name,
    nextServiceDate,
    nextServiceMileage,
    daysUntilDue: nextServiceDate
      ? Math.ceil((nextServiceDate - new Date()) / (1000 * 60 * 60 * 24))
      : null,
    milesUntilDue: nextServiceMileage
      ? nextServiceMileage - currentCarMileage
      : null,
  };
};

// Determine status based on due date/mileage
export const getServiceStatus = async (daysUntilDue, milesUntilDue) => {
  const isDueSoon =
    (daysUntilDue !== null && daysUntilDue <= 30) ||
    (milesUntilDue !== null && milesUntilDue <= 500);
  const isDue =
    (daysUntilDue !== null && daysUntilDue <= 7) ||
    (milesUntilDue !== null && milesUntilDue <= 100);
  const isOverdue =
    (daysUntilDue !== null && daysUntilDue < 0) ||
    (milesUntilDue !== null && milesUntilDue < 0);

  if (isOverdue) return "overdue";
  if (isDue) return "due";
  if (isDueSoon) return "soon";
  return "not active";
};

// Group parts that can be serviced together (within 7 days)
export const groupServiceableParts = async (partServices) => {
  const groups = [];
  const sorted = [...partServices].sort((a, b) => {
    const dateA = a.nextServiceDate || new Date(9999, 0);
    const dateB = b.nextServiceDate || new Date(9999, 0);
    return dateA - dateB;
  });

  for (const service of sorted) {
    let addedToGroup = false;

    for (const group of groups) {
      const groupDate = group.dueBy.date;
      const serviceDateDiff = Math.abs(
        (service.nextServiceDate - groupDate) / (1000 * 60 * 60 * 24),
      );

      // If within 7 days, add to this group
      if (serviceDateDiff <= 7) {
        group.parts.push(service.partId);
        // Use the earlier date
        if (service.nextServiceDate < groupDate) {
          group.dueBy.date = service.nextServiceDate;
        }
        // Use the lower mileage
        if (
          service.nextServiceMileage &&
          (!group.dueBy.mileage ||
            service.nextServiceMileage < group.dueBy.mileage)
        ) {
          group.dueBy.mileage = service.nextServiceMileage;
        }
        addedToGroup = true;
        break;
      }
    }

    // Create new group if not added to existing
    if (!addedToGroup) {
      groups.push({
        parts: [service.partId],
        dueBy: {
          date: service.nextServiceDate,
          mileage: service.nextServiceMileage,
        },
      });
    }
  }

  return groups;
};
