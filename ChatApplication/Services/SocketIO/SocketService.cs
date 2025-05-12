/*using SocketIOSharp.Server;

using SocketIOSharp.Common;
using System;
using System.Collections.Generic;

namespace WebApplication1.Services.SocketIO;

public class SocketService : ISocketService, IDisposable
{
    private SocketIOServer _server;
    private readonly Dictionary<string, string> _connectedClients = new();

    public SocketService()
    {
        InitializeServer();
    }

    private void InitializeServer()
    {
        _server = new SocketIOServer(new SocketIOServerOption(5169));

        // Handle client connection
        _server.On("connection", (socket) =>
        {
            var clientId = socket.Id;
            Console.WriteLine($"Client connected: {clientId}");
            _connectedClients[clientId] = string.Empty;

            // Handle client messages
            socket.On("messageSend", (data) =>
            {
                Console.WriteLine($"Message from client {clientId}: {data}");

                // Broadcast message to all clients
                _server.Emit("messageReceive", data);
            });

            // Handle disconnection
            socket.On("disconnect", () =>
            {
                Console.WriteLine($"Client disconnected: {clientId}");
                _connectedClients.Remove(clientId);
            });
        });

        // Start the server
        _server.Start();
        Console.WriteLine("Socket.IO server started on port 5169");
    }

    public void Dispose()
    {
        _server?.Stop();
        _server?.Dispose();
    }

    public void ConnectToSocket()
    {
        throw new NotImplementedException();
    }
}*/