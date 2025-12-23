async function fetchData() {
    const dashboard = document.getElementById('dashboard');

    try {
        const res = await fetch('/dashboard');
        const data = await res.json();

        const isFallback = data.orders.status === 'partial_failure';
        const statusClass = isFallback ? 'status-red' : 'status-green';
        const statusText = isFallback ? 'Circuit OPEN (Fallback)' : 'Circuit CLOSED (Healthy)';

        dashboard.innerHTML = `
      <!-- Status Card -->
      <div class="card">
        <span class="status-indicator ${statusClass}"></span>
        <span class="metric-label">System Health</span>
        <div class="metric-value" style="font-size: 1.5rem">${statusText}</div>
      </div>

      <!-- Latency Card -->
      <div class="card">
        <span class="metric-label">API Latency</span>
        <div class="metric-value">${data.latency}</div>
      </div>

      <!-- User Profile Card -->
      <div class="card user-profile">
        <div class="avatar">👤</div>
        <div>
          <div class="metric-label">Active User</div>
          <div class="metric-value" style="font-size: 1.5rem">${data.user.name}</div>
          <div style="color: var(--text-secondary);">${data.user.email}</div>
        </div>
      </div>

      <!-- Orders List -->
      <div class="card" id="orders-list">
        <div class="metric-label" style="margin-bottom: 1rem">Recent Orders</div>
        ${renderOrders(data.orders)}
      </div>
    `;

    } catch (err) {
        dashboard.innerHTML = `<div class="loading" style="color: var(--accent-red)">Failed to connect to gateway</div>`;
    }
}

function renderOrders(ordersData) {
    if (ordersData.status === 'partial_failure') {
        return `
      <div style="text-align: center; padding: 2rem; color: var(--accent-red); background: rgba(218, 54, 51, 0.1); border-radius: 8px;">
        <strong>⚠️ Service Unavailable</strong><br>
        ${ordersData.note}
      </div>
    `;
    }

    // If real data (array)
    if (Array.isArray(ordersData)) {
        return ordersData.map(order => `
      <div class="order-item">
        <span>${order.title.substring(0, 30)}...</span>
        <span style="color: ${order.completed ? 'var(--accent-green)' : 'var(--accent-yellow)'}">
          ${order.completed ? 'Completed' : 'Pending'}
        </span>
      </div>
    `).join('');
    }

    // Fallback for object wrapper if needed
    return '<div>No order data</div>';
}

// Refresh every 2 seconds
fetchData();
setInterval(fetchData, 2000);
